# iPhone price tracker
Tracks price and availability of iPhones in *unknown* online store.
This project uses NodeJS and Puppeteer to do some web scraping to collect desired info and email it to me to get notified!
There is defined a cron job to web scrap desired page at certain times and see if anything is available.

## Setup
This project uses Docker for ease of deployment when needed.
1. Build Docker image of the project:
```bash
docker build .
```
2. Install NodeJS dependencies:
```bash
docker-compose run nodejs npm install
```
3. Create and fill the file ".env" as in ".env.example".

## Usage
Just `docker-compose up` it! If any iPhone is available for given page, you will be emailed the available ones.