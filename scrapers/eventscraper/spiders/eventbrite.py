import scrapy
import textwrap
import calendar
import re
from scrapy.spiders import CrawlSpider
from eventscraper.items import Event
from dateutil.parser import parse

class EventBrite(CrawlSpider):
    name = 'eventbrite'
    start_urls = ['https://www.eventbrite.es/d/spain--madrid/science-and-tech--events/?page=1']

    def parse(self, response):
        lista = response.xpath('//a[@class="eds-media-card-content__action-link"]/@href')            
        for cabecera in lista:
            yield scrapy.Request(cabecera.extract(), callback=self.parse_details)            

    def parse_details(self, response):
        group_and_namelocation = response.xpath('//h2[contains(@class, "listing-map-card-title text-medium")]/text()').extract()        
        if (len(group_and_namelocation) == 0):
            group_and_namelocation.append("")
        abstract = self.getAbstract(response)
        date_str = response.xpath('//div[@class="event-details hide-small"]/div[@class="event-details__data"]/meta/@content').extract_first()
        date_str = self.getTimeStamp(date_str)
        location = self.getLocation(response)

        if (location['query'] != "" and not date_str is None):
            event = Event()
            event['source'] = 'eventbrite'
            event['title'] = self.getTitle(response)
            event['group'] = self.cleanString(group_and_namelocation[0])
            event['abstract'] = abstract
            event['abstract_details'] = textwrap.shorten(abstract, width=150, placeholder="...")
            event['target_url'] = response.request.url
            event['datetime'] = date_str
            event['location'] = location
            event['price'] = self.getPrice(response)
            yield event

    def getTimeStamp(self, date_str): 
        if (date_str is None):
            return None
        date  = parse(date_str)#datetime.strptime(date_str, '%Y-%m-%dT%H:%M:%S')
        date_str = str(calendar.timegm(date.utctimetuple()))
        return date_str+'000'
    
    def getTitle(self, response):
        title = response.xpath('//span[@class="summary"]/text()').extract_first()       
        if (title is None):
            title = response.xpath('//h1[@class="listing-hero-title"]/text()').extract_first()            
        return self.cleanString(title)
    
    def getAbstract(self, response):
        #//div[contains(@class, "js-xd-read-more-contents")]/p
        #//div[contains(@class, "listing-info__body")]//div[contains(@class, "l-lg-pad-right-6")]//p
        abstract = response.xpath('//div[contains(@class, "listing-info__body")]//div[contains(@class, "l-lg-pad-right-6")]//p').extract()
        return " ".join(abstract)
    
    def getPrice(self, response):
        price_str = response.xpath('//div[@class="js-display-price"]/text()').extract_first()
        is_trusted = True
        if (price_str is None):
            price_str = ""
            is_trusted = False
        price_str = self.cleanString(price_str.lower())
        is_free = False    
        if (price_str == "gratis" or price_str == "free"):
            price_str = '0'
            is_free = True
        price = {}
        price['is_free'] = is_free
        price['details'] = price_str
        price['is_trusted'] = is_trusted

        return price

        

    def getLocation(self, response):

        lat = response.xpath("//meta[@property='event:location:latitude']/@content").extract_first()
        lng = response.xpath("//meta[@property='event:location:longitude']/@content").extract_first()
        query_google = ""
        if (not lat is None and not lng is None):
            query_google = lat + ',' + lng        

        group_and_namelocation = response.xpath('//h2[contains(@class, "listing-map-card-title text-medium")]/text()').extract()
        address = response.xpath('//p[@class="listing-map-card-street-address text-default"]/text()').extract_first()        
        nameLocation = ""
        if not (group_and_namelocation is None) and len(group_and_namelocation) == 2:
            nameLocation = group_and_namelocation[1]

        location = {}
        location['name'] = self.cleanString(nameLocation)
        location['address'] = self.cleanString(address)
        location['query'] = query_google
        location['lat'] = lat
        location['lng'] = lng

        return location
    
    def cleanString(self, word):
        if (not word is None ):
            word = word.replace('\n', '')
            word = word.replace('\t', '')
            word = word.replace('\r', '')

        return word


