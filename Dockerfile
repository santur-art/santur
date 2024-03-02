FROM nginx:alpine

RUN mkdir santur-art
COPY . /santur-art

# COPY nginx.conf
RUN rm /etc/nginx/nginx.conf
COPY ./assets/nginx/nginx.conf /etc/nginx/

EXPOSE 443
