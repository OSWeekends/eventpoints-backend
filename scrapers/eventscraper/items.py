from scrapy.item import Item, Field


class Event(Item):
    name = Field()
    group = Field()
    host = Field()
    place = Field()
    address = Field()
