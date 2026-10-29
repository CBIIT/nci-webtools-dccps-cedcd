FROM public.ecr.aws/amazonlinux/amazonlinux:2023

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

RUN mkdir -p /app/database

WORKDIR /app/database

COPY database/ ./

RUN npm install

CMD ["node", "import.js"]
