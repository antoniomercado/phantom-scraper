FROM phusion/baseimage


RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y -q --no-install-recommends \
	wget curl vim git libfontconfig

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 4.2.4
ENV SOURCE_DIR /src
ENV LIB_DIR $SOURCE_DIR/lib

WORKDIR $SOURCE_DIR

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash \
	&& . $NVM_DIR/nvm.sh && nvm install $NODE_VERSION

COPY . $SOURCE_DIR
RUN . $NVM_DIR/nvm.sh && nvm use $NODE_VERSION && npm install

CMD . $NVM_DIR/nvm.sh && nvm use $NODE_VERSION && node main.js