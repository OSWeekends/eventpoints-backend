from scrapy.item import Item, Field


class Event(Item):
    title = Field()
    group = Field()
    host = Field()
    abstract = Field()
    abstract_details = Field()
    target_url = Field()
    datetime = Field()
    location = Field()
    price = Field()
    source = Field()
