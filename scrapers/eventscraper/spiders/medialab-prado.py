import scrapy
import textwrap
from urllib.parse import urlparse, parse_qs
from scrapy.spiders import CrawlSpider
from eventscraper.items import Event

base_url = 'https://www.medialab-prado.es'

class MeetupSpider(CrawlSpider):
    name = 'medialab-prado'
    allowed_domains = ['medialab-prado.es']    
    start_urls = [base_url + '/actividades_list']
 
    def parse(self, response):
        tech_meetups = response.xpath('//div[@class="row"]/div[@class="eight columns"]')

        for tech_meetup in tech_meetups:

            event = Event()
            event['source'] = 'medialab-prado' 
            
            event['title'] = tech_meetup.xpath('div[@class="field field-name-node-title"]/span/h2/a/text()').extract_first()
            event['price'] = {}
            event['price']['details'] = '0'
            event['price']['is_trusted'] = True
            event['price']['is_free'] = True

            details_url = base_url + tech_meetup.xpath('div[@class="field field-name-node-title"]/span/h2/a/@href').extract_first()

            event['target_url'] = details_url

            yield scrapy.Request(details_url, callback=self.parse_details, meta={'event': event})

    @staticmethod
    def parse_details(response):

        event = response.meta['event']

        #print('****************')
        #print()
        #print('****************')

        #details = response.xpath('//*[@id="block-medialab-theme-content"]/div/div').extract_first()
        #abstract = response.xpath('//*[@id="descripcion"]/div[1]/span/p[1]/span/').extract_first()
        # abstract_details = response.xpath('//*[@id="descripcion"]/div[1]/span/p[1]/span').extract()
        event['host'] = ''
        event['abstract'] = 'esto es una prueba' #textwrap.shorten(abstract, width=157, placeholder="...")
        event['abstract_details'] = 'Pendiente de scrapear' #tengo que parsear todos los detalles

        event['location'] = {}
        event['location']['name'] = 'Medialab Prado'
        event['location']['address'] = 'Calle Alameda 15, 28014 Madrid, España'
        event['location']['query'] = '40.4105204,-3.6957741'
        event['location']['lat'] = 40.4105204
        event['location']['lng'] = -3.6957741

        event['datetime'] = 1545224400000 + (15*24*60*60*1000)

        yield event

