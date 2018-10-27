import scrapy
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
            event['name'] = tech_meetup.xpath('a/span/text()').extract_first()
            event['group'] = tech_meetup.xpath('div/a/span/text()').extract_first()
            details_url = tech_meetup.xpath('a/@href').extract_first()

            yield scrapy.Request(details_url, callback=self.parse_details, meta={'event': event})

    @staticmethod
    def parse_details(response):
        event = response.meta['event']
        event['host'] = response.xpath('//div[contains(@class, "event-info-hosts-text")]/a/span/span/span/text()').extract_first()
        location = response.xpath('//address/p/text()').extract()
        event['place'] = location[0]
        event['address'] = location[1]

        yield event
