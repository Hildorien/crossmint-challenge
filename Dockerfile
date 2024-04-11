################################
#            STEP 1            #
# install dependencies & build #
################################
FROM node:16-alpine AS build


WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/
COPY tsconfig.json /app/
COPY src /app/src/
COPY .env /app/
COPY config /app/config/

RUN npm ci
RUN npm run build

################################
#            STEP 2            #
# copy compiled files and run  #
################################
FROM alpine:3
RUN apk add nodejs --no-cache
WORKDIR /app

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/


# ENV VARIABLES
ENV PORT=5000

EXPOSE 5000
CMD node dist/src/index.js