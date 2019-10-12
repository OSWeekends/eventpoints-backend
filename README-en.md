![header](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-header.jpg)

# eventpoints-backend

[![Build Status](https://action-badges.now.sh/OSWeekends/osw-hacktoberfest-2019?action=Node%20CI)](https://github.com/OSWeekends/eventpoints-backend/actions)
[![Netlify Status](https://api.netlify.com/api/v1/badges/bb376a42-74ce-4038-ad1c-902a61c40550/deploy-status)](https://app.netlify.com/sites/osw-eventpoints/deploys)
[![Style](https://img.shields.io/badge/code%20style-standard-brightgreen?style=flat-square)](https://img.shields.io/badge/code%20style-standard-brightgreen?style=flat-square)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/OSWeekends/eventpoints-backend/pulls)
[![GitHub last commit](https://img.shields.io/github/last-commit/OSWeekends/osw-hacktoberfest-2019?style=flat-square)](https://github.com/OSWeekends/eventoints-backend/commits/dev)
[![first-timers-only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square)](https://www.firsttimersonly.com/)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/OSWeekends/eventpoints-backend?style=flat-square)

[![All Contributors](https://img.shields.io/badge/all_contributors-53-orange.svg?style=flat-square)](#contributors)
[![Code of conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](https://github.com/OSWeekends/eventpoints-backend/blob/master/CODE_OF_CONDUCT.md)
![GitHub](https://img.shields.io/github/license/OSWeekends/osw-hacktoberfest-2019?color=blue&style=flat-square)

## About Eventpoints

 Eventpoints is one of the project developed within the [Open Source Weekends] community.

 [Open Source Weekends]:(http://osweekends.com/)

 [EventPoints](http://osw.eventpoints.netlify.com/) is a web calendar of technological events in Spain that uses scrapping techniques to read the available events from various sources.

 EventPoints has two main repositories:

 * **Backend:** This repository contains both the scraper and the API code that serves the events.

 * **Frontend:** This [repository] contains a React application that uses this project [API] to query, filter and georeference different events.

[repository]:(https://github.com/OSWeekends/EventPoints)
[API]:(https://eventpoints-backend.osweekends.com/api/v1/spec)


#### Languages

There is also a Spanish version of this Readme [here](https://github.com/OSWeekends/eventpoints-backend/blob/master/README.md).

## Repository structure

The repository has two fundamental blocks structured in two different folders:

* **api:** API Rest developed with Node.js, Pillarsjs and a GoblinDB database that serves the information obtained by the scrapers.
* **scrapers:** Source code of the different scrapers of the project that store the information ones it has been obtained.

## API

The API can be found in the `api` directory.

Run `npm install` from within the `api` directory to install dependencies.

API documentation, created using Swagger, can be accessed at: http://localhost:3000/api/v1/spec

To start, run the API using `npm start`, then access it at http://localhost:3000/api/v1/events



## Python Scrapers

There are many scrapers developed in Python using [Scrapy Library](https://doc.scrapy.org/en/latest/).

#### Installation

* Recommended Python version: **3.6***
* Recommended version of Pip: **18.1**

Create a virtual environment

`python3 -m venv ./venv`

Install the dependencies

`pip3 install -r requirements.txt`

If you're using Python 3.7, you'll get an error that you can solve by running

`pip3 install git+https://github.com/twisted/twisted.git@trunk`


##### Launch Spiders

To run the scraper use:

`scrapy crawl {spider_name} -o {json_path}`

With `spider_name` being the name of the spider and `json_path` being the JSON file in which the scraped data will be dumped in.

As an example, the following command will create a spider named `meetup` and any scraped data will be dumped in `meetup.json`

`scrapy crawl meetup -o output / meetup.json`

Scrapy appends data to the end of the JSON file at `json_path`. Therefore, you should delete the JSON file before each execution.

## R Scraper

#### R Installation

If you want to run the scraper using R (on Linux Debian based) you should first install the R language.

* Install previous dependencies.

`apt install libcurl4-openssl-dev libssl-dev libxml2-dev`

* Install R.

`apt install r-base`

* Run R environment (using sudo).

`sudo -i R`

* Install scraper dependencies.

`install.packages("tidyverse")`

#### Launch spiders using R

To execute in console one of the R spiders, we will execute the following command:

`R CMD BATCH {spider_name}.R {json_path}`

Where `spider_name` is the name of the spider and `json_path` is the JSON where the scrap will be dumped.

## Team

- Facilitator:
	- Daniel García (Slack:@DGJones / GitHub:[@danielgj](https://github.com/danielgj)))
- Mentors:
    - Daniel García (Slack:@DGJones / GitHub:[@danielgj](https://github.com/danielgj)))
	- Jorge Baumann (Slack:@jbaumann / GitHub:[@baumannzone](https://github.com/baumannzone))
	- Ricardo García-Duarte (Slack:@RicardoGDM / GitHub:[@rgarciaduarte](https://github.com/rgarciaduarte))
	- Theba Gomez (Slack:@KoolTheba / GitHub:[@KoolTheba](https://github.com/KoolTheba))
	- Ulises Gascon (Slack:@ulisesgascon / GitHub:[@UlisesGascon](https://github.com/UlisesGascon))
- Slack channel: **#pr_eventpoints_new*





![footer](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-footer.jpg)
