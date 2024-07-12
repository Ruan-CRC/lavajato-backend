/* eslint-disable no-console */
import app from './app';
import WsServer from './wsServer';

app.start(process.env.PORT || '3333');

const websocket = new WsServer(8080);

export default websocket;
