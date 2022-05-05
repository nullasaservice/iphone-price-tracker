# syntax=docker/dockerfile:1
FROM node:18

# Puppeteer, used in this project, requires Chrome.
# As Chrome has a list of dependencies not included by default,
# Chrome is installed at OS level for retrieving required dependencies.
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt update && apt install -y google-chrome-stable

RUN mkdir /app
WORKDIR /app