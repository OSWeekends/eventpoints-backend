![header](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-header.jpg)

# eventpoints-backend

## Scraper

The scraper is made with Scrapy, a Python library.

#### Installation

Recommended Python version: **3.6**
Recommended version of Pip: **18.1**

Create a virtual environment

`python3 -m venv ./venv`

Install the dependencies

`pip3 install -r requirements.txt`

If you're using Python 3.7, you'll get an error that you can solve by running

`pip3 install git+https://github.com/twisted/twisted.git@trunk`

#### Use

[Scrapy Docs](https://doc.scrapy.org/en/latest/)

##### Launch Spiders

`scrapy crawl {spider_name} -o {json_path}`

With `spider_name` being the name of the spider and `json_path` being the JSON file in which the scraped data will be dumped in.

Use example 

The following command will create a spider named `meetup` and any scraped data will be dumped in `meetup.json`

`scrapy crawl meetup -o output / meetup.json`

Scrapy appends data to the end of the JSON file at `json_path`. Therefore, you should delete the JSON file before each execution.

## API

The api is in the `api` directory.

To install dependencies, run `npm install` from within the `api` directory.

API documentation, created using Swagger, can be accessed at: http://localhost:3000/api/v1/spec

Use `npm start` to run the API, then access it at http://localhost:3000/api/v1/events

`#eventpoints_new` in Slack

![footer](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-footer.jpg)
