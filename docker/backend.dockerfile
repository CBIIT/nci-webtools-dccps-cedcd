FROM public.ecr.aws/amazonlinux/amazonlinux:2023

RUN dnf -y upgrade --refresh \
    && dnf -y install \
    nodejs24 \
    tar \
    gzip \
    && dnf -y upgrade \
    && dnf -y upgrade python3 python3-libs libsolv \
    && dnf clean all

RUN npm install -g npm@latest \
    && npm cache clean --force

RUN chmod 700 /usr/bin/python3.9 

RUN mkdir -p /app/server

WORKDIR /app/server

COPY server/package.json server/package-lock.json ./

RUN npm install

COPY server/ ./

EXPOSE 8221

CMD ["node", "index.js"]
