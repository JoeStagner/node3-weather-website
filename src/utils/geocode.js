// Function Declaration

const request = require('request')

const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiam9lc3RhZ25lciIsImEiOiJjazJ4Y2Uwb3Ewb3U1M2NwbWg5amR3ejdrIn0.8TG9u3dhheWSV1arEcG1WA'
    request({ url:url, json:true }, (error, response) => {

        if (error) {
            callback('Unable to connect to the GeoCode Service', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('Location not found.', undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }

    })
}

module.exports = geocode
