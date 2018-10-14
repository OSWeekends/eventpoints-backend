#### Instalación

Probado en un venv con Python 3.6

`pip3 install -r requirements.txt`

#### Uso

[Scrapy Docs](https://doc.scrapy.org/en/latest/)

##### Lanzamiento de spiders

`scrapy crawl {spider_name} -o {json_path}`

Siendo `spider_name` el nombre de la araña y `json_path` el JSON en el que se va a
volcar el scrapeo. 
Scrapy escribe al final del fichero por lo que en sucesivas
ejecuciones habría que borrar el JSON si ya existe.

Ejemplo de uso

`scrapy crawl meetup -o output/meetup.json`
