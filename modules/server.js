var http = require('http');
var colors = require('colors');
var handlers = require('./handlers');

var params = {
  port: 9000,
  messages: {
    server: {
      live: 'Server is live on port ',
      receiving: 'Receiving request for '
    }
  }
}

function start() {

  function onRequest(request, response) {
    console.log((params.messages.server.receiving + request.url).green);

    response.writeHead(200, {"Content-Type": "text/plain"});

    switch (request.url) {
      case '/':
      case '/start':
        handlers.welcome(request, response);
        break;
      case '/upload':
        handlers.upload(request, response);
        break;
      default:
        handlers.error(request, response);
    }
  }

  http.createServer(onRequest).listen(params.port);

  console.log((params.messages.server.live + params.port).green);
}

module.exports = start;
