//Done
import http from 'http';
import { app } from './app.js';
import { AddressInfo } from 'net';

const PORT = process.env.PORT || 3400;
const onError = () => {};
const onListening = () => {
    var addr = server.address();
    var bind =
        typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + (addr as AddressInfo).port;
    console.log('Listening on ' + bind);
};
app.set('port', PORT);
const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(PORT);
