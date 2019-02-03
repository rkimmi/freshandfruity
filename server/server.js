var path = require('path')

var express = require('express')
var bodyParser = require('body-parser')
var routes = require('./routes')

var app = express()

module.exports = app

// Middleware

app.use(express.static(__dirname + '/public'))
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', routes)