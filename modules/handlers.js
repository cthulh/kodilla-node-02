var params = {
  upload: {
    log: 'Rozpoczynam obsługę żądania upload.',
    write: 'Rozpoczynam upload!'
  },
  welcome: {
    log: 'Rozpoczynam obsługę żądania welcome.',
    write: 'Witaj na stronie startowej!'
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
    response.write(params.welcome.write);
    response.end();
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
