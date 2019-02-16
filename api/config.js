module.exports = {
    debugMode: true,
    dbConfig: {
        fileName: 'event_points'
    },
    harmonizerCron: "*/55 * * * *", //(cada 55 minutos)
    scraperCron: "*/45 * * * *", //(cada 45 minutos)
    port: 3000,
    mockupData: true
}