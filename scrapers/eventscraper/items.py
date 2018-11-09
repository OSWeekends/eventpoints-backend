from scrapy.item import Item, Field


class Event(Item):
    title = Field()
    group = Field()
    host = Field()
    short_details = Field()
    details = Field()
    date = Field()
    location = Field()
    price = Field()
    source = Field()
