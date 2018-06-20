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
    switch (request.url) {
      case '/styles.css':
        handlers.loadCss(request, response);
        break;
      case '/':
      case '/start':
        handlers.welcome(request, response);
        break;
      case '/upload':
        handlers.upload(request, response);
        break;
      case '/show':
        handlers.show(request, response);
        break;
      default:
        handlers.error(request, response);
    }
  }

  http.createServer(onRequest).listen(params.port);

  console.log((params.messages.server.live + params.port).green);
}

module.exports = start;
