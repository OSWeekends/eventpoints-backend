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

        details = response.xpath('//*[@id="block-medialab-theme-content"]/div/div').extract_first()
        abstract = response.xpath('//*[@id="descripcion"]/div[1]/span/p[1]/span/').extract_first()
        abstract_details = response.xpath('//*[@id="descripcion"]/div[1]/span/p[1]/span').extract()
        event['host'] = ''
        event['abstract'] = abstract #textwrap.shorten(abstract, width=157, placeholder="...")
        event['abstract_details'] = '' #tengo que parsear todos los detalles

        '''

        #TODO: Podemos anyadir la hora inicio y la hora fin
        event['datetime'] = response.xpath('//time/@datetime').extract_first()

        location = response.xpath('//address/p/text()').extract()
        event['location'] = {}
        event['location']['name'] = location[0]
        event['location']['address'] = location[1]

        google_maps_url = response.xpath('//a[contains(@class, "venueDisplay")]/@href').extract_first()
        google_maps_url_params = parse_qs(urlparse(google_maps_url.replace('%2C', ',')).query)
        event['location']['query'] = google_maps_url_params['query'][0]

        #TODO: A veces no vienen las coordenadas en la URL, buscar alternativa
        google_maps_coordinates = google_maps_url_params['query'][0].split(',')

        event['location']['lat'] = google_maps_coordinates[0]
        event['location']['lng'] = google_maps_coordinates[1]

        '''

        yield event

