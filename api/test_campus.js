const _ = require('lodash'),
    uuidV4 = require('uuid/v4'),
    fs = require('fs'),
    moment = require('moment');

const example = {"title": "Inside Circus: Build - Programa tu propia Landing page", "group": "IRONHACK", "source": "google_campus", "abstract": "Ingresar al mundo digital puede ser muy fácil, si sabes por dónde. El mundo laboral está evolucionando a una velocidad sin precedentes, y ...", "datetime": "1560074400000", "location": {"address": "Calle Moreno Nieto, 2, 28005 Madrid", "lat": "40.4124265", "lng": "-3.7204109"}};
const sources = [
    {
        "id": "meetup",
        "type": "py",
        "name": "Meetup",
        "logo": "https://secure.meetupstatic.com/s/img/5455565085016210254/logo/svg/logo--script.svg",
        "url": "https://www.meetup.com/es-ES/"
    },
    {
        "id": "eventbrite",
        "type": "py",
        "name": "Eventbrite",
        "logo": "https://www.eventbrite.com/wp-content/themes/core/img/blog-logo2x.png",
        "url": "https://www.eventbrite.es/"
    },
    {
        "id": "medialab_prado",
        "type": "r",
        "name": "Medialab Prado",
        "logo": "https://www.medialab-prado.es/themes/custom/medialab_theme/img/logotipo@2x.jpg",
        "url": "https://www.medialab-prado.es/"
    },
    {
        "id": "google_campus",
        "type": "py",
        "name": "Google Campus",
        "logo": "",
        "url": "https://www.campus.co/madrid/es/"
    }
];

const transform = (event) => {
    const eventDateTime =  Number(event.datetime);
                const fullSource = sources.find(x => x.id === event.source);
                event.source = fullSource;
                event.datetime = eventDateTime;
                event.date = moment(eventDateTime).format("DD-MM-YYYY");
                event.time = moment(eventDateTime).format("HH:mm:ss");
                event.id = uuidV4();

    console.log("Event", event);

}

transform(example);