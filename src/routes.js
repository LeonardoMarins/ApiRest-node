import { Database } from './database.js'
import {randomUUID} from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database()

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const users = database.select("users");

      return res
        .setHeader("Content-type", "application/json")
        .end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert("users", user);

      return res.end("criação de usuarios");
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {

    }
  }
];
