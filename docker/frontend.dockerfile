# frontend.dockerfile

FROM centos:8.3.2011

RUN dnf -y update \
    && dnf -y module enable mod_auth_openidc \
    && dnf -y module enable nodejs:14 \
    && dnf -y install \
    httpd \
    mod_auth_openidc \
    nodejs \
    && dnf clean all

# Add custom httpd configuration
# COPY docker/cedcd_frontend.conf /etc/httpd/conf.d/cedcd.conf

RUN mkdir /client

WORKDIR /client

COPY client/package*.json /client/

RUN npm install

COPY client /client/

RUN npm run build \
    && mv /client/build/ /var/www/html/cedcd

WORKDIR /var/www/html

RUN chmod 755 -R /var/www/html

EXPOSE 80
EXPOSE 443

CMD rm -rf /run/httpd/* /tmp/httpd* \
    && exec /usr/sbin/apachectl -DFOREGROUND

