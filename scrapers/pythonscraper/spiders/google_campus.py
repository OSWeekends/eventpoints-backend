import scrapy
import textwrap
import json
import calendar
import re
from urllib.parse import urlparse, parse_qs
from scrapy.spiders import CrawlSpider
from pythonscraper.items import Event
from dateutil.parser import parse

class GoogleCampusSpyder(CrawlSpider):

    name = 'google_campus'
    allowed_domains = ['campus.co']
    start_urls = ['https://www.campus.co/api/campuses/madrid/events/v2']

    def parse(self, response):
        jsonresponse = self.cleanjson(response)

        for obj in jsonresponse['objects']:
            event = Event()
            event['source'] = 'google_campus'
            event['title'] = obj['name']
            event['group'] = obj['host_company_name']
            event['abstract'] = obj['description_preview']
            event['target_url'] = 'https://www.campus.co/madrid/es/events/' + obj['_key']
            event['host'] = obj['host_company_name']
            event['abstract_details'] = ''
            event['datetime'] =  self.getTimeStamp(obj['local_start_str'])#obj['local_start_str'].split('T')[0]
            event['location'] = {}
            event['location']['name'] = 'Google Campus'
            event['location']['address'] = 'Calle Moreno Nieto, 2, 28005 Madrid'
            event['location']['lat'] = '40.4124265'
            event['location']['lng'] = '-3.7204109'
            event['location']['query'] = '40.4124265,-3.7204109'
            event['price'] = {}
            event['price']['details'] = '0'
            event['price']['is_trusted'] = True
            event['price']['is_free'] = True
            event_page = self.start_urls[0] + '/' + obj['_key']
            yield scrapy.Request(event_page, callback=self.parse_details, meta={'event' : event})

    def getTimeStamp(self, date_str): 
        if (date_str is None):
            return None
        date  = parse(date_str)
        date_str = str(calendar.timegm(date.utctimetuple()))
        return date_str+'000'

    def parse_details(self, response):
        jsonresponse = self.cleanjson(response)

        event = response.meta['event']
        event['abstract_details'] = self.cleanhtml(jsonresponse['objects'][0]['description'])
        yield event
    
    def cleanjson(self, raw_json):
        resp_formateada = raw_json.body_as_unicode()[6:] # elimina )]}', al principio del json
        return json.loads(resp_formateada)

    def cleanhtml(self, raw_html):
        cleanr = re.compile('<.*?>')
        cleantext = re.sub(cleanr, '', raw_html)
        return cleantext