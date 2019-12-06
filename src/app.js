
const  geocode = require('./utils/geocode')
const  weather = require('./utils/weather')

const path = require('path')

// set up express web server 
const express = require('express')
const app = express()
const hbs = require('hbs')

const port = process.env.PORT  || 3000

// set up Handlebars for Express
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//  Set up static directory to server from 
app.use(express.static(path.join(__dirname, '../public')))

//--------------------------------------------------------------------------------------------------------------------+
//  Default  URL Handler 
//--------------------------------------------------------------------------------------------------------------------+
app.get('', (req, res) => {
    res.render('index', {
        title: 'HOME',
        name: 'Joe stagner'
    })
})

//--------------------------------------------------------------------------------------------------------------------+
//  About  URL Handler 
//--------------------------------------------------------------------------------------------------------------------+
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT',
        name: 'Joe stagner'
    })
})

//--------------------------------------------------------------------------------------------------------------------+
// Help   URL Handler 
//--------------------------------------------------------------------------------------------------------------------+
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        message: 'This is your help. ',
        name: 'Joe stagner'
    })
})

//--------------------------------------------------------------------------------------------------------------------+
// Help 404  URL Handler 
//--------------------------------------------------------------------------------------------------------------------+
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'HELP Not Found',
        message: 'The resource you have requested was not found on the server. . ',
        name: 'Joe stagner'
    })
})

//--------------------------------------------------------------------------------------------------------------------+
// Weather URL Handler
//--------------------------------------------------------------------------------------------------------------------+
app.get('/weather', (req, res) => {

    const address = req.query.address

    if(!address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

   geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        weather(longitude, latitude, (error, weatherdata) => {
            if (error) {
                return res.send({ error })
            }                
            return res.send({
                forcast: weatherdata,
                location,
                address: address
            })
        })

    })
})

//--------------------------------------------------------------------------------------------------------------------+
//  /Products URL Handler
//--------------------------------------------------------------------------------------------------------------------+
app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    res.send({
        products: []
    })

})

//--------------------------------------------------------------------------------------------------------------------+
//  default handler for unfound resources 
//--------------------------------------------------------------------------------------------------------------------+
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Resource Not Found',
        message: 'The resource youhave requested was not found on the server. . ',
        name: 'Joe stagner'
    })
})

// Start web server 

app.listen(port, () =>  {
    console.log('Server is up on port ' + port)
})

