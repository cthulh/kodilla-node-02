var fs = require('fs');

var params = {
  upload: {
    log: 'Rozpoczynam obsługę żądania upload.',
    write: 'Rozpoczynam upload!'
  },
  welcome: {
    log: 'Rozpoczynam obsługę żądania welcome.',
    write: 'templates/start.html'
  },
  error: {
    log: 'Nie wiem co robić.',
    write: '404 :('
  }
}

function upload(request, response) {
    console.log(params.upload.log);
    response.write(params.upload.write);
    response.end();
}

function welcome(request, response) {
    console.log(params.welcome.log);
    fs.readFile(params.welcome.write, function(err, html) {
      response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
      response.write(html);
      response.end();
    });
}

function error(request, response) {
    console.log(params.error.log);
    response.write(params.error.write);
    response.end();
}

module.exports = {
  upload: upload,
  welcome: welcome,
  error: error
}
