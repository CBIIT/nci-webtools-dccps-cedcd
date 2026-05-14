FROM public.ecr.aws/amazonlinux/amazonlinux:2023

RUN dnf -y upgrade --refresh \
    && dnf -y install \
    nodejs24 \
    && dnf clean all

RUN npm install -g npm@latest \
    && npm cache clean --force

RUN mkdir -p /app/database

WORKDIR /app/database

COPY database/ ./

RUN npm install

CMD ["node", "import.js"]
