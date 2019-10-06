import scrapy
import textwrap
from urllib.parse import urlparse, parse_qs
from scrapy.spiders import CrawlSpider
from eventscraper.items import Event


class MeetupSpider(CrawlSpider):
    name = 'campus-madrid'
    allowed_domains = ['campus.co']
    start_urls = ['https://www.campus.co/madrid/es/events/']
 
    def parse(self, response):


        campus_events = response.xpath('//*[@id="main"]/div[2]/div/div[3]/div[4]/div').extract()
        

        for campus_event in campus_events:
            event = Event()

            print('****************')
            print(campus_event)
            print('****************')
            
            event['source'] = 'campus-madrid' 

            event['price'] = {}
            event['price']['details'] = '0'
            event['price']['is_trusted'] = True
            event['price']['is_free'] = True

            event['location'] = {}
            event['location']['name'] = 'Campus Madrid'
            event['location']['address'] = 'Calle Moreno Nieto, 2, 28005 Madrid, España'
            event['location']['query'] = '40.4124265,-3.7204109'
            event['location']['lat'] = 40.4124265
            event['location']['lng'] = -3.7204109
        
            
            # event['title'] = campus_event.xpath('a/span/text()').extract_first()
            # event['group'] = campus_event.xpath('div/a/span/text()').extract_first()

            # details_url = campus_event.xpath('a/@href').extract_first()

'''
            yield scrapy.Request(details_url, callback=self.parse_details, meta={'event': event})

    @staticmethod
    def parse_details(response):
        event = response.meta['event']

        event['target_url'] = response.request.url

        details = response.xpath('//div[contains(@class, "event-description")]/p').extract_first()
        event['host'] = response.xpath('//div[contains(@class, "event-info-hosts-text")]/a/span/span/span/text()').extract_first()
        event['abstract'] = textwrap.shorten(details, width=150, placeholder="...")
        event['abstract_details'] = details

        event['price'] = {}
        event['price']['details'] = '0'
        event['price']['is_trusted'] = True
        event['price']['is_free'] = True

        #TODO: Podemos anyadir la hora inicio y la hora fin
        event['datetime'] = response.xpath('//time/@datetime').extract_first()

        event['location'] = {}
        event['location']['name'] = 'Campus Madrid'
        event['location']['address'] = 'Calle Moreno Nieto, 2, 28005 Madrid, España'
        event['location']['query'] = '40.4124265,-3.7204109'
        event['location']['lat'] = 40.4124265
        event['location']['lng'] = -3.7204109
        
        yield event

        '''
