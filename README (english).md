![header](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-header.jpg)

# eventpoints-backend

## Scraper
The scraper is made with Scrapy, a Python library.

#### Installation

Recomended Python version: 3.6
Recomended Pip version: 18.1

We created the venv

`python3 -m venv ./venv`

We installed the dependencies

`pip3 install -r requirements.txt`

If you're using Python 3.7, there is an error that can be fixed by running

`pip3 install git+https://github.com/twisted/twisted.git@trunk`

#### Use

[Scrapy Docs](https://doc.scrapy.org/en/latest/)

##### Spiders launch

`scrapy crawl {spider_name} -o {json_path}`

Being `spider_name` the name of the spider and `json_path` the JSON in which you are going to
overturn the scrapeo.

Scrapy writes at the end of the file, so in successive executions JSON should be deleted if it already exists.

Use exemple

`scrapy crawl meetup -o output/meetup.json`

## API

The api is in the `api` directory

To install the API dependencies we put ourselves in its directory and run: `npm install`

API documentation in swagger: http://localhost:3000/api/v1/spec

To execute the API: `npm start`
Once launched we see it at --> http://localhost:3000/api/v1/events

`#eventpoints_new` in Slack

![footer](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-footer.jpg)
