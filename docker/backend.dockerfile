FROM public.ecr.aws/amazonlinux/amazonlinux:2023

RUN dnf -y upgrade --refresh \
    && dnf -y install \
    nodejs24 \
    tar \
    gzip \
    && dnf -y upgrade python3 python3-libs \
    && dnf clean all

# Do not use `npm install --prefix .../lib/node_modules/npm <pkg>`: that re-resolves npm's
# entire dependency tree and can fail (e.g. 404 on @npmcli/*) or fight corporate mirrors.
# Upgrade the global npm CLI instead so brace-expansion and other bundled deps match a release.
RUN npm install -g npm@11.14.1 \
    && npm cache clean --force

RUN mkdir -p /app/server

WORKDIR /app/server

COPY server/package.json server/package-lock.json ./

RUN npm install

COPY server/ ./

EXPOSE 8221

CMD ["node", "index.js"]
