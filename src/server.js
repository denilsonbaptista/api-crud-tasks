import { createServer } from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

const port = 3000;

const server = createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(route => {
    return route.method === method && route.path === url;
  });

  return route.handler(req, res);
});

server.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
