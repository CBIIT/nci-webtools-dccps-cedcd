FROM public.ecr.aws/amazonlinux/amazonlinux:2023

RUN dnf -y upgrade --refresh \
    && dnf -y install \
    nodejs \
    npm \
    tar \
    gzip \
    && dnf -y upgrade python3 python3-libs || true \
    && dnf clean all

# Refresh the bundled npm CLI so transitive deps under /usr/lib/node_modules/npm
# (tar, minimatch, brace-expansion, etc.) track current npm releases.
# Latest npm 10.x (Node 18+). npm 11 requires Node ^20.17 — only switch after the image uses Node 20+.
RUN npm install -g npm@10.9.8 \
    && npm cache clean --force

RUN mkdir -p /app/server

WORKDIR /app/server

COPY server/package.json server/package-lock.json ./

RUN npm install

COPY server/ ./

EXPOSE 8221

CMD ["node", "index.js"]
