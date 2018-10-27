![header](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-header.jpg)

# eventpoints-backend

## Scraper

Ruta: ./datasource

El scraper está hecho con Scrapy, una librería de Python.

#### Instalación

Versión recomendada de Python: 3.6

Creamos el venv

`python3 -m venv ./venv`

Instalamos las dependencias

`pip3 install -r requirements.txt`

Si usas Python 3.7, da un error que se puede solucionar ejecutando

`pip3 install git+https://github.com/twisted/twisted.git@trunk`

#### Uso

[Scrapy Docs](https://doc.scrapy.org/en/latest/)

##### Lanzamiento de spiders

Desde ./datasource

`scrapy crawl {spider_name} -o {json_path}`

Siendo `spider_name` el nombre de la araña y `json_path` el JSON en el que se va a
volcar el scrapeo. 
Scrapy escribe al final del fichero por lo que en sucesivas
ejecuciones habría que borrar el JSON si ya existe.

Ejemplo de uso

`scrapy crawl meetup -o output/meetup.json`

## API

Documentación de la API en swagger: [https://eventpoints.baulen.com/](https://eventpoints.baulen.com/)

To install dependencies: `npm install`

To launch the API: `npm start`
Once launched --> http://localhost:3000/api/v1/events

`#eventpoints_new` en Slack

![footer](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-footer.jpg)
