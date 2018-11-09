import scrapy
import textwrap
from urllib.parse import urlparse, parse_qs
from scrapy.spiders import CrawlSpider
from eventscraper.items import Event


class MeetupSpider(CrawlSpider):
    name = 'meetup'
    allowed_domains = ['meetup.com']
    start_urls = ['https://www.meetup.com/find/events/tech/']

    def parse(self, response):
        tech_meetups = response.xpath('//div[@class="chunk"]')
        for tech_meetup in tech_meetups:
            event = Event()
            event['source'] = {}
            #TODO: Seguramente toda esta info debería de añadirla la API, aquí podríamos simplemente indicar el ID de source.
            event['source']['name'] = 'Meetup'
            event['source']['logo'] = 'https://secure.meetupstatic.com/s/img/5455565085016210254/logo/svg/logo--script.svg'
            event['source']['url'] = 'https://www.meetup.com'

            event['title'] = tech_meetup.xpath('a/span/text()').extract_first()
            event['group'] = tech_meetup.xpath('div/a/span/text()').extract_first()

            details_url = tech_meetup.xpath('a/@href').extract_first()

            yield scrapy.Request(details_url, callback=self.parse_details, meta={'event': event})

    @staticmethod
    def parse_details(response):
        event = response.meta['event']

        event['source']['event_url'] = response.request.url

        details = response.xpath('//div[contains(@class, "event-description")]/p').extract_first()
        event['host'] = response.xpath('//div[contains(@class, "event-info-hosts-text")]/a/span/span/span/text()').extract_first()
        event['short_details'] = textwrap.shorten(details, width=150, placeholder="...")
        event['details'] = details

        event['price'] = {}
        event['price']['details'] = '0'
        event['price']['is_trusted'] = True
        event['price']['is_free'] = True

        #TODO: Podemos añadir la hora inicio y la hora fin
        event['date'] = {}
        event['date']['datetime'] = response.xpath('//time/@datetime').extract_first()

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

        yield event
