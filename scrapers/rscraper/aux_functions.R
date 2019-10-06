##### Funci?n scraping de la pag de actividades ####


landscraping <- function(paginas){ #Funci?n de scraping de landing
  
  url <- paste('https://www.medialab-prado.es/actividades?page=', paginas, sep= '')
  
  webpage <- read_html(url)
  
  desc_html=html_nodes(webpage,'h2') #trae el nodo de informaci?n del men? general 
  desc <- html_text(desc_html) #trae el t?tulo
  
  
  
  desc_html2 <- html_nodes(desc_html,'a') #trae la web
  
  
  desc_html3 <- html_text(desc_html2)  #TITULO GUAY
  
  urlist <- as.vector(NULL)
  
  largo <- length(desc_html2)
  
  for (i in 1:largo){
    urldest <- xml_attrs(desc_html2[[i]])[["href"]]
    
    urlist <- rbind(urlist, urldest)
  }  
  
  
  titulo <- as.data.frame(desc_html3)
  
  table <- cbind(urlist, titulo)
  
  
}





##### Funci?n scraping actividades #### 

subscraping <- function(suburl, titulo) {
  
  
  
  webpage <- read_html(suburl)
  
  #Fecha Hora
  desc_html=html_nodes(webpage, "div.field.field-name-field-schedule-tip") #Trae el nodo del t?tulo y la fecha 
  #desc_html2 <- html_node(desc_html, 'span') 
  #FechaHora <- html_text(desc_html2) 
  
  #Contenido
  #desc_html2=html_nodes(desc_html,'a') #trae la web
  desc_html=html_nodes(webpage, "div.field.field-name-field-description.text-formatted")
  desc_html=html_nodes(desc_html, "p")
  texto <- html_text(desc_html) #trae e texto 
  texto <- data.frame(texto, stringsAsFactors = FALSE)
  
  texto <- texto %>%
    filter(str_length(texto) > 10 )
  
  texto <-  as.vector(texto[1,1])
  
  
  
  #Lugar
  desc_html=html_nodes(webpage, "div.field.field-name-field-location")
  desc_html=html_nodes(desc_html, "a")
  lugar <- html_text(desc_html)
  
  
  desc_html=html_nodes(webpage, "div.field.field-name-field-specific-date") #Trae el nodo de la fecha 
  desc_html2 <- html_node(desc_html, 'span') 
  fechaHora <- html_text(desc_html2) 
  fechaHora <- gsub("\n", "", fechaHora)
  fechaHora <- gsub(" ", "", fechaHora)
  fechaHora <- gsub(lubridate::year(Sys.Date()), paste(lubridate::year(Sys.Date()), '@', sep=""), fechaHora)
  fecha <-  as.vector(as.data.frame(strsplit(fechaHora, split="@"))[1,1])
  hora <- as.vector(as.data.frame(strsplit(fechaHora, split="@"))[2,1])
  
  desc_html=html_nodes(webpage, "div.field.field-name-field-event-type")
  desc_html2 <- html_node(desc_html, 'span') 
  tipo <- as.vector(html_text(desc_html2))
  
  if( is_empty(texto) == TRUE) {texto = ""}
  if( is_empty(lugar) == TRUE) {lugar = ""}
  if( is_empty(fecha) == TRUE) {fecha = ""}
  if( is_empty(hora) == TRUE) {hora = ""}
  if( is_empty(tipo) == TRUE) {tipo = ""}
  
  salida <- data.frame(titulo, texto, lugar, fecha, hora, tipo, stringsAsFactors = FALSE)[1,] 
  
  return(salida)
  
}
