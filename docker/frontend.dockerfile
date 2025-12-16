FROM public.ecr.aws/amazonlinux/amazonlinux:2023

RUN dnf -y update \
    && dnf -y install \
    gcc-c++ \
    httpd \
    make \
    nodejs \
    npm \
    && dnf clean all

RUN mkdir -p /app/client

WORKDIR /app/client

COPY client/package.json client/package-lock.json ./

RUN npm install

COPY client/ ./

ARG REACT_APP_VERSION=local
ENV REACT_APP_VERSION=${REACT_APP_VERSION}

RUN npm run build

# Copy built files to Apache document root
RUN cp -r build/* /var/www/html/

COPY docker/httpd-cedcd.conf /etc/httpd/conf.d/httpd-cedcd.conf

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/httpd/access_log \
    && ln -sf /dev/stderr /var/log/httpd/error_log

EXPOSE 80
EXPOSE 443

ENV SERVER_TIMEOUT=900

CMD rm -rf /run/httpd/* /tmp/httpd* \
    && exec /usr/sbin/httpd -DFOREGROUND
