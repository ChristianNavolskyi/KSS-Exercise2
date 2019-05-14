FROM node

WORKDIR /src/app

VOLUME ./ /src/app

EXPOSE 3000

CMD ["npm", "start"]