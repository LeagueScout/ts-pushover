var config  = require('./config.json'),
    fs      = require('fs'),
    spawn   = require('child_process').spawn,
    push    = require('pushover-notifications'),
    files   = fs.readdirSync("logs"),
    file    = files[files.length - 1],
    tail    = spawn('tail', ['-f', "-n0", "logs/"+ file]),
    states  = ['servergroup', 'edited', 'stopped', 'permission'];

var pushMessage = new push( {
    user: config.user,
    token: config.tocken
});

tail.stdout.on('data', function(data) {
  var log_data = data.toString();

  states.forEach(function(status, index) {
    if (log_data.indexOf(status) !== -1) {
      pushMessage.send({
        message:  log_data,
        title:    "News from TS-Server",
        sound:    'magic',
        priority: 1
      });
    }
  });
