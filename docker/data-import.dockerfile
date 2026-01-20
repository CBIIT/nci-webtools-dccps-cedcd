FROM public.ecr.aws/amazonlinux/amazonlinux:2023

RUN dnf -y update \
    && dnf -y install \
    nodejs \
    npm \
    && dnf clean all

RUN mkdir -p /app/database

WORKDIR /app/database

COPY database/ ./

RUN npm install

CMD ["node", "import.js"]
