const request = require('request')

const weather = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/e82ede3fca96b680413aaa800c432eff/' + long + ',' + lat 
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } 
        else if (body.error) {
            callback('Unable to find location.', undefined)
        } 
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = weather

