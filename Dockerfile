FROM nginx:alpine
ADD ./dist /usr/share/nginx/html
ADD ./nginx /etc/nginx/conf.d