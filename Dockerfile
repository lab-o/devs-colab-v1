FROM php:7.0-apache

RUN apt-get update && apt-get install -y \
    git \
    unzip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo pdo_mysql
COPY 000-default.conf /etc/apache2/sites-available/

COPY devsColab /var/www/devsColab
COPY parametersdocker.yml /var/www/devsColab/app/config/parameters.yml
RUN chmod -R 777 /var/www/devsColab/var/
WORKDIR /var/www/devsColab