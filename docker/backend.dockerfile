FROM public.ecr.aws/amazonlinux/amazonlinux:2023

RUN dnf -y upgrade --refresh \
    && dnf -y install \
    nodejs \
    npm \
    tar \
    gzip \
    && dnf clean all

# Refresh the bundled npm CLI so transitive deps under /usr/lib/node_modules/npm (e.g. tar, minimatch)
# match current npm releases and reduce scanner noise vs the distro-shipped npm snapshot.
RUN npm install -g npm@10 \
    && npm cache clean --force

RUN mkdir -p /app/server

WORKDIR /app/server

COPY server/package.json server/package-lock.json ./

RUN npm install

COPY server/ ./

EXPOSE 8221

CMD ["node", "index.js"]
