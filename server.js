
const http = require('http');
const app = require('./app');
const loger = require("./logtimer/writeLog.js")

const normalizePort = val => {
  const port = parseInt(val, 10);
console.log('port = '+port);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '8081');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  console.table(address);
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  loger(' DEMARRAGE DU SERVEUR => '+ bind);
});

server.listen(port);