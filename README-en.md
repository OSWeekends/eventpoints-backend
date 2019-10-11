![header](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-header.jpg)

# eventpoints-backend

The Eventpoints backend relies on scraping to obtain data on technological events from different sources.

Depending on the data source, the scraping will be made with Python or R.

The following README describes how to set up the infrastructure to execute both Python and R scrapers, as well as how to install and run the API itself.

# Languages

There is also a spanish version of this README [here](https://github.com/OSWeekends/eventpoints-backend/blob/master/README.md)

## Scraper

The scraper is made with Scrapy, a Python library.

#### Installation

* Recommended Python version: **3.6***
* Recommended version of Pip: **18.1**

Create a virtual environment

`python3 -m venv ./venv`

Install the dependencies

`pip3 install -r requirements.txt`

If you're using Python 3.7, you'll get an error that you can solve by running

`pip3 install git+https://github.com/twisted/twisted.git@trunk`

#### Usage

You can look for the Scrappy documentation here:

[Scrapy Docs](https://doc.scrapy.org/en/latest/)

##### Launch Spiders

To run the scraper use:

`scrapy crawl {spider_name} -o {json_path}`

With `spider_name` being the name of the spider and `json_path` being the JSON file in which the scraped data will be dumped in.

As an example, the following command will create a spider named `meetup` and any scraped data will be dumped in `meetup.json`

`scrapy crawl meetup -o output / meetup.json`

Scrapy appends data to the end of the JSON file at `json_path`. Therefore, you should delete the JSON file before each execution.

## R Scraper

#### R Installation

If you want to run the scraper using R you should first install the R language.

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


## API

The API can be found in the `api` directory.

Run `npm install` from within the `api` directory to install dependencies.

API documentation, created using Swagger, can be accessed at: http://localhost:3000/api/v1/spec

To start, run the API using `npm start`, then access it at http://localhost:3000/api/v1/events

`#eventpoints_new` in Slack

![footer](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-footer.jpg)
