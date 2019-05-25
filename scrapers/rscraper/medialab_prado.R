library(tidyr)
library(stringr)
library(tidyverse)
library(rvest)
library(dplyr)

args <- commandArgs(TRUE)
ruta <- args[1]

cat("Ruta de salida")
cat(ruta)
cat("\n")


source("aux_functions.R")


cat("Definimos la URL")

cat("\n")
web <- 'https://www.medialab-prado.es'
#Definimos la URL de las pag a realizar scraping
url <- 'https://www.medialab-prado.es/actividades?page='

#Creamos dos tablas vac?as, una para el resultado final y otra para las url de las actividades
Detalles <- data.frame()
tablaurl <- data.frame()

#Definimos cuantas pag de actividades analizaremos
land <- 4 

cat("extrayendo las URL")
#Este bucle extrae las url de las actividades y las cuarda en tablaurl
for (a in 1:land){
  tablas <- landscraping(a-1)
  
  Sys.sleep(3)
  tablaurl <- rbind(tablaurl, tablas)
  
}

cat("calculamos cuantas actividades existen")
cat("\n")
largo <- as.integer(length(tablaurl$urlist))

#Extraemos las actividades. 
cat("Extrayendo las actividades")
for(i in 1:largo){
  
  suburl <- as.vector(paste(web, tablaurl[i,1], sep=''))

  titulo <- as.vector(tablaurl[i,2])
  
  prueba <- try(subscraping(suburl, titulo))
  
  
  Detalles <- rbind(Detalles, prueba)
  
  Sys.sleep(3)
  
}

write.csv2(Detalles, ruta)

