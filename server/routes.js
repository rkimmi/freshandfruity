/* global localStorage */

var express = require('express')
var router = express.Router()
const request = require('superagent')

// var development = require('./knexfile').development
// var knex = require('knex')(development)

router.get('/admin/login', function (req, res) {
  res.render('admin-login')
})

router.get('/admin', function (req, res) {
  // console.log(res)
  /* eslint-disable no-use-before-define */
  // localStorage.getItem('token') // send token, if valid then render index.html, else render login.html
    /* eslint-enable no-use-before-define */
  res.sendFile('admin-login.html', {
        root: 'client'
      })
    // res.render('admin-index')
})

router.get('/', function (req, res) {
    res.render( { title: 'Hey', message: 'Hello there!' })
})

router.post('/admin', function(req, res ) {
  const usr = req.body.secretusr
  const psw = req.body.secretpsw
  console.log('response' + res)
  // request.post('http://localhost:5984/_session')
  // .send({name: usr, password: psw})
  // .end(function(error, response){
  //   if(error) { 
  //      console.log("Error: " + error);
  //   }
  // })
})


module.exports = router