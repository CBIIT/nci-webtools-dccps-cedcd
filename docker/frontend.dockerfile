# frontend.dockerfile

FROM centos:8.3.2011

RUN dnf -y update \
    && dnf -y module enable nodejs:14 \
    && dnf -y install \
    httpd \
    nodejs \
    && dnf clean all

RUN mkdir /client

WORKDIR /client

COPY client/package*.json /client/

RUN npm install

COPY client /client/

RUN npm run build \
    && rm -R /var/www/html/ && mv /client/build/ /var/www/html/

WORKDIR /var/www/html

# Add custom httpd configuration
COPY docker/cedcd_frontend.conf /etc/httpd/conf.d/cedcd.conf

RUN chmod 755 -R /var/www/html

EXPOSE 80
EXPOSE 443

CMD rm -rf /run/httpd/* /tmp/httpd* \
    && exec /usr/sbin/apachectl -DFOREGROUND

