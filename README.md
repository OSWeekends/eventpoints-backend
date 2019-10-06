![header](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-header.jpg)

# eventpoints-backend doc

El backend de Eventpoints se apoya en scraping para obtener datos de eventos tecnológicos de distintas fuentes.

Dependiendo de la fuente de datos, el scraping se realiza con Python o con R.

Se describe a continuación cómo montar la infraestructura para ejecutar los scrapers tanto de Python como de R, así como para instalar y ejecutar el API en si misma.

## Scraper Python

El scraper está hecho con Scrapy, una librería de Python.

#### Instalación

Versión recomendada de Python: 3.6
Versión recomendada de Pip: 18.1

Creamos el venv

`python3 -m venv ./venv`

Activamos el venv

`source venv/bin/activate`

Instalamos las dependencias

`pip3 install -r requirements.txt`

Si usas Python 3.7, da un error que se puede solucionar ejecutando

`pip3 install git+https://github.com/twisted/twisted.git@trunk`

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

## Scraper R

#### Instalación de R

Para instalar R (en Linux basado en Debian):

* Instalar dependencias previas

`apt install libcurl4-openssl-dev libssl-dev libxml2-dev`

* Instalar R en si

`apt install r-base`

* Arrancar el entorno de ejecución de R (con sudo):

`sudo -i R`

* Instalar las dependencias del scraper:

`install.packages("tidyverse")`

#### Lanzamiento de spiders

Para ejecutar desde consola uno de los spiders de R ejecutaremos el siguiente comando:

`R CMD BATCH {spider_name}.R {json_path}`

Siendo `spider_name` el nombre de la araña y `json_path` el JSON en el que se va a
volcar el scrapeo. 

## API

El api está en el directorio `api`

Para instalar las dependencias del API nos metemos en su directorio y ejecutamos: `npm install`

Documentación de la API en swagger: http://localhost:3000/api/v1/spec

Para ejecutar el API: `npm start`
Una vez lanzado la vemos en --> http://localhost:3000/api/v1/events

`#eventpoints_new` en Slack

![footer](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-footer.jpg)
