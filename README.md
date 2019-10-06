![header](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-header.jpg)

# eventpoints-backend doc

El backend de Eventpoints se apoya en scraping para obtener datos de eventos tecnológicos de distintas fuentes.

Dependiendo de la fuente de datos, el scraping se realiza con Python o con R.

Se describe a continuación cómo montar la infraestructura para ejecutar los scrapers tanto de Python como de R, así como para instalar y ejecutar el API en si misma.

## Scraper Python

Este es un scraper y ha sido desarrollado con la  libreria Scrapy,de Python.

#### Instalación
Requerimientos Minimos:
Para  instalar y ejecutar este projecto necesitas

Python Versión 3.6

Pip Versión 18.1

Instrucciones: 
Crear venv con el comando
 
`python3 -m venv ./venv`

Necesitas instalar las  dependencias despues con el comando 

`pip3 install -r requirements.txt`

Si usas Python 3.7,  es possible tene un error este error se puede solucionar ejecutando el comando

`pip3 install git+https://github.com/twisted/twisted.git@trunk`

#### Uso

visita  la  documentacion de Scrappy localizada aqui. 

[Scrapy Docs](https://doc.scrapy.org/en/latest/)

##### Lanzamiento de spiders

Para  ejecutar la  araña- spider o el scrapper-  necesitas correr el comando

`scrapy crawl {spider_name} -o {json_path}`

remplaza para producir el  resultado correcto:  
`spider_name`: El nombre de la araña,
`json_path`: El archivo Json  donde se volcara el Scrapeado producido por la araña.

Scrapy escribe al final del fichero por lo que en sucesivas
ejecuciones habría que borrar el archivo JSON si ya existe.

Un ejemplo de esto es:

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

El API está en el directorio `api`

Para instalar las dependencias necesitadas del API  requiere que estemos en el directorio  conteniendo el API y ejecutar el comando:
`npm install`

Para ejecutar el API usa el comando: 
`npm start`

Una vez lanzado la vemos en --> http://localhost:3000/api/v1/events

`#eventpoints_new` en Slack



La Documentación del API en swagger se enctuentra en:

http://localhost:3000/api/v1/spec

![footer](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-footer.jpg)
