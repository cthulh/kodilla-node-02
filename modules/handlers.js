var fs = require('fs');
var formidable = require('formidable');

var params = {
  upload: {
    log: 'Processing upload request.',
    write: 'templates/upload.html',
    path: 'uploads/'
  },
  welcome: {
    log: 'Processing welcome request.',
    write: 'templates/start.html'
  },
  error: {
    log: 'Request not recognised.',
    write: '404 :('
  },
  show: {
    log: 'Processing uploaded picture...',
    uploaded: ''
  }
}

function upload(request, response) {
    console.log(params.upload.log);
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
      fs.renameSync(files.upload.path, params.upload.path + files.upload.name);
      params.show.uploaded = files.upload.name;
      fs.readFile(params.upload.write, function(err, html) {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.write(html);
        response.end();
      });
    });
}

function welcome(request, response) {
    console.log(params.welcome.log);
    fs.readFile(params.welcome.write, function(err, html) {
      response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      response.write(html);
      response.end();
    });
}

function error(request, response) {
    console.log(params.error.log);
    response.write(params.error.write);
    response.end();
}

function show(request, response) {
  console.log(params.show.log);
  fs.readFile(params.upload.path + params.show.uploaded, 'binary', function(error, file) {
    response.writeHead(200, {'Content-Type': 'image/png'});
    response.write(file, 'binary');
    response.end();
  });
}

module.exports = {
  upload: upload,
  welcome: welcome,
  error: error,
  show: show
}
