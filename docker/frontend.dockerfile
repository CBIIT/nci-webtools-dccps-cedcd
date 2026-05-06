# -----------------------------------------------------------------------------
# Stage 1: compile the React app. Includes Node, npm, and node_modules only here.
# -----------------------------------------------------------------------------
FROM public.ecr.aws/amazonlinux/amazonlinux:2023 AS builder

RUN dnf -y upgrade --refresh \
    && dnf -y install \
    gcc-c++ \
    make \
    nodejs \
    npm \
    && dnf clean all

RUN npm install -g npm@10 \
    && npm cache clean --force

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
    && dnf -y upgrade httpd httpd-filesystem httpd-tools mod_http2 mod_ssl \
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
