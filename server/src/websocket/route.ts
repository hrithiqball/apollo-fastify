import { FastifyInstance } from 'fastify';
import { WebSocket } from '@fastify/websocket';

let index = 0;
let connections: WebSocket[] = [];
const characters = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i),
);

const sendNextCharacter = () => {
  const character = characters[index % characters.length];
  connections.forEach(ws => {
    if (ws.readyState === ws.OPEN) {
      ws.send(`Server sent: ${character}`);
    }
  });
  index++;
};

export default async function websocketRoutes(server: FastifyInstance) {
  setInterval(sendNextCharacter, 1000);

  server.get('/', { websocket: true }, ws => {
    connections.push(ws);

    ws.on(
      'message',
      (
        message: string | JSON | XMLDocument | HTMLAllCollection | BinaryType,
      ) => {
        console.log('message', message);
        ws.send(`Fastify received message. You said ${message}`);
      },
    );

    ws.on('close', () => {
      connections = connections.filter(connection => connection !== ws);
    });
  });
}
