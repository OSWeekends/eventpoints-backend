![header](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-header.jpg)

# eventpoints-backend

[![Build Status](https://action-badges.now.sh/OSWeekends/osw-hacktoberfest-2019?action=Node%20CI)](https://github.com/OSWeekends/eventpoints-backend/actions)
[![Netlify Status](https://api.netlify.com/api/v1/badges/bb376a42-74ce-4038-ad1c-902a61c40550/deploy-status)](https://app.netlify.com/sites/osw-eventpoints/deploys)
[![Style](https://img.shields.io/badge/code%20style-standard-brightgreen?style=flat-square)](https://img.shields.io/badge/code%20style-standard-brightgreen?style=flat-square)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/OSWeekends/eventpoints-backend/pulls)
[![GitHub last commit](https://img.shields.io/github/last-commit/OSWeekends/osw-hacktoberfest-2019?style=flat-square)](https://github.com/OSWeekends/eventoints-backend/commits/dev)
[![first-timers-only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square)](https://www.firsttimersonly.com/)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/OSWeekends/eventpoints-backend?style=flat-square)

[![All Contributors](https://img.shields.io/badge/all_contributors-53-orange.svg?style=flat-square)](#contributors)
[![Code of conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](https://github.com/OSWeekends/eventpoints-backend/blob/master/CODE_OF_CONDUCT.md)
![GitHub](https://img.shields.io/github/license/OSWeekends/osw-hacktoberfest-2019?color=blue&style=flat-square)

## Sobre EventPoints

EventPoints es uno de los proyectos desarrollados dentro de la comunidad [Open Source Weekends](http://osweekends.com/).

[EventPoints](http://osw.eventpoints.netlify.com/) es una agenda web de eventos tecnológicos en España que utilizando técnicas de scraping lee los eventos disponibles de diversas fuentes.

EventPoints tiene dos repositorios principales:

* **Backend:** Este repositorio. Contiene tanto el código de los scrapers como el del API que sirve los eventos.
* **Frontend:** Este [repositorio](https://github.com/OSWeekends/EventPoints) contiene una aplicación React que consultando el [API](https://eventpoints-backend.osweekends.com/api/v1/spec) de este proyecto permite consultar, filtrar y geolocalizar los distintos eventos.


## Estructura del repositorio

El repositorio tiene dos bloques fundamentales estructurados en dos carpetas distintas:

* **api:** API Rest desarrollada con Node.js, Pillarsjs y base de datos GoblinDB que sirve la información obtenida por los scrapers.
* **scrapers:** Código fuente de los diferentes scrapers del proyecto que una vez obtenida la información lo almacena.

### API

Para instalar las dependencias necesitadas del API  requiere que estemos en el directorio  conteniendo el API y ejecutar el comando:
`npm install`

Para ejecutar el API usa el comando: 
`npm start`

Una vez lanzado puedes consultar el listado de eventos en --> http://localhost:3000/api/v1/events

La Documentación del API en swagger se encuentra en --> http://localhost:3000/api/v1/spec


### Scrapers Python

Hay varios scrapers desarrollados en Python con la  libreria [Scrapy](https://doc.scrapy.org/en/latest/).

#### Instalación

Para instalar y ejecutar los scrapers de Python necesitas:

* Python Versión 3.6
* Pip Versión 18.1

Instrucciones: 

* Crear venv con el comando `python3 -m venv ./venv`
* Instalar las  dependencias despues con el comando `pip3 install -r requirements.txt`
* Si usas Python 3.7, es posible que de un error que se puede solucionar ejecutando el comando `pip3 install git+https://github.com/twisted/twisted.git@trunk`


##### Lanzamiento de spiders

Para  ejecutar la  araña- spider o el scrapper-  necesitas correr el comando `scrapy crawl {spider_name} -o {json_path}`

Sobre el anterior comando, remplaza para producir el resultado correcto lo siguiente:  
* `spider_name`: El nombre de la araña,
* `json_path`: El archivo Json  donde se volcara el Scrapeado producido por la araña.

Scrapy escribe al final del fichero por lo que en sucesivas ejecuciones habría que borrar el archivo JSON si ya existe.

Un ejemplo de esto es:

`scrapy crawl meetup -o output/meetup.json`

### Scraper R

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

## Equipo

- Facilitador:
	- Daniel Gacía (Slack:@DGJones / GitHub:[@danielgj](https://github.com/danielgj)))
- Mentores:
    - Daniel Gacía (Slack:@DGJones / GitHub:[@danielgj](https://github.com/danielgj)))
	- Jorge Baumann (Slack:@jbaumann / GitHub:[@baumannzone](https://github.com/baumannzone))
	- Ricardo García-Duarte (Slack:@RicardoGDM / GitHub:[@rgarciaduarte](https://github.com/rgarciaduarte))
	- Theba Gomez (Slack:@KoolTheba / GitHub:[@KoolTheba](https://github.com/KoolTheba))
	- Ulises Gascon (Slack:@ulisesgascon / GitHub:[@UlisesGascon](https://github.com/UlisesGascon))
- Canal de Slack: **#pr_eventpoints_new*


![footer](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-footer.jpg)
