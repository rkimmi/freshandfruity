/* global localStorage */

var express = require('express')
var router = express.Router()
const request = require('superagent')

// var development = require('./knexfile').development
// var knex = require('knex')(development)

router.get('/admin', function (req, res) {
  res.sendFile('admin-index.html', {
    root: 'client'
  })
})

router.get('/admin/login', function (req, res) {
  // console.log(res)
  /* eslint-disable no-use-before-define */
  // localStorage.getItem('token') // send token, if valid then render index.html, else render login.html
    /* eslint-enable no-use-before-define */
  res.sendFile('admin-login.html', {
        root: 'client'
      })
    // res.render('admin-index')
})



module.exports = router