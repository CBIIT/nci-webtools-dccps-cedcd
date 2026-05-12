FROM public.ecr.aws/amazonlinux/amazonlinux:2023

RUN dnf -y upgrade --refresh \
    && dnf -y install \
    nodejs24 \
    tar \
    gzip \
    && dnf -y upgrade python3 python3-libs \
    && dnf clean all

# Patch brace-expansion CVE-2026-33750 in the bundled npm's own node_modules.
# AL2023 nodejs24 ships npm 11.12.1 with brace-expansion <5.0.5; fix requires 5.0.5+.
RUN npm install --prefix /usr/lib/nodejs24/lib/node_modules/npm brace-expansion@5.0.5 \
    && npm cache clean --force

RUN mkdir -p /app/server

WORKDIR /app/server

COPY server/package.json server/package-lock.json ./

RUN npm install

COPY server/ ./

EXPOSE 8221

CMD ["node", "index.js"]
