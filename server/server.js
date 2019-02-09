var path = require('path')

var express = require('express')
var bodyParser = require('body-parser')
var routes = require('./routes')

var app = express()



// Middleware

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname  + '/public')))
app.use(bodyParser.json())

app.use('/', routes)

module.exports = app