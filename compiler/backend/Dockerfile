FROM node:24-alpine
WORKDIR /ComplierBackend
RUN apk update && apk add --no-cache g++
COPY . .
RUN npm install
EXPOSE 4000
CMD ["node", "index.js"]



# Set the working directory=>Docker
#local