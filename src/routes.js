import { randomUUID } from 'node:crypto';
import { Database } from './database.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      const data = database.select('tasks');

      return res.end(JSON.stringify(data));
    },
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      const { title, description } = req.body;

      const data = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const taskExists = database
        .select('tasks')
        .find(task => task.title === title);

      if (taskExists) {
        return res.writeHead(400).end('Task already exists');
      }

      database.insert('tasks', data);

      return res.writeHead(201).end();
    },
  },
];
