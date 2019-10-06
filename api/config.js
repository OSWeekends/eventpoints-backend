module.exports = {
    debugMode: true,
    dbConfig: {
        fileName: 'event_points'
    },
    harmonizerCron: "*/55 * * * *", //(Todas las horas en el minuto 55)
    pythonCron: "*/45 * * * *", //(Todas las horas en el minuto  45)
    rCron: "*/46 * * * *", //(Todas las horas en el minuto  46)
    port: 3000,
    mockupData: false
}