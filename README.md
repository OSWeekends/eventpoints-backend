![header](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-header.jpg)

# eventpoints-backend

## Scraper

The scraper is made with Scrapy, a Python library.

#### Installation

recommended version of Python: 3.6
recommended version of Pip: 18.1

We create the venv

`python3 -m venv ./venv`

We install the dependencies

`pip3 install -r requirements.txt`

If you use Python 3.7, it gives an error that can be solved by running

`pip3 install git+https://github.com/twisted/twisted.git@trunk`

#### Use

[Scrapy Docs](https://doc.scrapy.org/en/latest/)

##### Spiders launch

`scrapy crawl {spider_name} -o {json_path}`

Being `spider_name` the name of the spider and `json_path` the JSON in which you are going to
overturn the scrapeo. 
Scrapy writes at the end of the file, so in successive
executions should delete the JSON if it already exists.

Use example

`scrapy crawl meetup -o output/meetup.json`

## API

The api is in the `api` directory

To install the API dependencies we enter its directory and run: `npm install`

API documentation in swagger: http://localhost:3000/api/v1/spec

To run the API: `npm start`
Once launched we see it in --> http://localhost:3000/api/v1/events

`#eventpoints_new` in Slack

![footer](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-footer.jpg)
