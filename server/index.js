var server = require('./server')

var PORT = 3000

server.listen(PORT, function () {
  console.log('FEELING FRESH ON PORT', PORT)
})