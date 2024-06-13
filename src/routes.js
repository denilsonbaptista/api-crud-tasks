import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query;

      const task = database.select(
        'tasks',
        search
          ? {
              title: search,
              description: search,
            }
          : null,
      );

      return res.end(JSON.stringify(task));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title && !description) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: 'Missing title or description' }));
      }

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
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: 'Task already exists' }));
      }

      database.insert('tasks', data);

      return res.writeHead(201).end();
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title && !description) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: 'Missing title or description' }));
      }

      const task = database.select('tasks').find(task => task.id === id);

      if (!task) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: 'Task does not exist' }));
      }

      const data = database.update('tasks', id, {
        title: title ?? task.title,
        description: description ?? task.description,
        updated_at: new Date(),
      });

      return res.end(JSON.stringify(data));
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      const task = database.select('tasks').find(task => task.id === id);

      if (!task) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: 'Task does not exist' }));
      }

      database.delete('tasks', id);

      return res.writeHead(204).end();
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;

      const task = database.select('tasks').find(task => task.id === id);

      if (!task) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: 'Task does not exist' }));
      }

      database.update('tasks', id, {
        completed_at: task.completed_at ? null : new Date(),
        updated_at: new Date(),
      });

      return res.writeHead(204).end();
    },
  },
];
