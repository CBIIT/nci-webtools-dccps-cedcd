# -----------------------------------------------------------------------------
# Stage 1: compile the React app. Includes Node, npm, and node_modules only here.
# -----------------------------------------------------------------------------
FROM public.ecr.aws/amazonlinux/amazonlinux:2023 AS builder

RUN dnf -y upgrade --refresh \
    && dnf -y install \
    tar \
    gzip \
    && dnf clean all

# AL2023 repos lack a patched Node 24 (CVE-2026-111497 fixed in 24.22.1)
ARG NODE_VERSION=24.22.1

RUN ARCH=$(uname -m | sed 's/x86_64/x64/;s/aarch64/arm64/') \
 && FILE=node-v${NODE_VERSION}-linux-${ARCH}.tar.gz \
 && cd /tmp \
 && curl -fsSLO https://nodejs.org/dist/v${NODE_VERSION}/${FILE} \
 && curl -fsSLO https://nodejs.org/dist/v${NODE_VERSION}/SHASUMS256.txt \
 && grep " ${FILE}$" SHASUMS256.txt | sha256sum -c - \
 && tar -xzf ${FILE} -C /usr/local --strip-components=1 --no-same-owner \
 && rm -f ${FILE} SHASUMS256.txt

RUN npm install -g npm@latest \
    && npm cache clean --force

RUN chmod 700 /usr/bin/python3.9 
WORKDIR /app/client

COPY client/package.json client/package-lock.json ./
RUN npm ci

COPY client/ ./

ARG REACT_APP_VERSION=local
ENV REACT_APP_VERSION=${REACT_APP_VERSION}

RUN npm run build

# -----------------------------------------------------------------------------
# Stage 2: runtime — Apache only + static assets. No Node/npm/node_modules,
# so registry scanners do not see webpack/tar/xlsx package paths at runtime.
# -----------------------------------------------------------------------------
FROM public.ecr.aws/amazonlinux/amazonlinux:2023

RUN dnf -y upgrade --refresh \
    && dnf -y install \
    httpd \
    && dnf clean all

COPY --from=builder /app/client/build/ /var/www/html/

COPY docker/httpd-cedcd.conf /etc/httpd/conf.d/httpd-cedcd.conf

RUN ln -sf /dev/stdout /var/log/httpd/access_log \
    && ln -sf /dev/stderr /var/log/httpd/error_log

EXPOSE 80
EXPOSE 443

ENV SERVER_TIMEOUT=900

CMD rm -rf /run/httpd/* /tmp/httpd* \
    && exec /usr/sbin/httpd -DFOREGROUND
