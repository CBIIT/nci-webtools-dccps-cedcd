FROM public.ecr.aws/amazonlinux/amazonlinux:2023

RUN dnf -y upgrade --refresh \
    && dnf -y install \
    nodejs \
    npm \
    && dnf clean all

# Same as backend/frontend builder: distro npm can ship vulnerable brace-expansion under /usr/lib/.../npm.
RUN npm install -g npm@10.9.8 \
    && npm cache clean --force

RUN mkdir -p /app/database

WORKDIR /app/database

COPY database/ ./

RUN npm install

CMD ["node", "import.js"]
