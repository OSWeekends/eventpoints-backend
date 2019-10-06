![header](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-header.jpg)

# eventpoints-backend

## Scraper

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
