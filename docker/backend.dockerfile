#backend.dockerfile

FROM centos:8.3.2011

RUN dnf -y update \
    && dnf -y install \
    dnf-plugins-core \
    epel-release \
    glibc-langpack-en \
    && dnf -y module enable nodejs:14 \
    && dnf -y install \
    nodejs \
    openssl-devel \
    && dnf clean all

RUN mkdir -p /deploy/server /deploy/logs /deploy/server/client/www

WORKDIR /deploy/server

# use build cache for npm packages
COPY server/package*.json /deploy/server/

RUN npm install

# copy the rest of the application
COPY server .

# ========== test ===========


# COPY docker/cedcd_frontend.conf /etc/httpd/conf.d/cedcd.conf
# RUN mkdir /client
# WORKDIR /client
# COPY client/package*.json /client/
# RUN npm install
# COPY client /client/
# RUN npm run build \
#    && mv /client/build/* /deploy/server/client/www/


# ========== test ===========
WORKDIR /deploy/server

CMD export NODE_ENV=development && npm run start:dev
