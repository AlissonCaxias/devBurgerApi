import express from "express";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import router from "./routes.js";
import "./database/index.js"; // inicializa Sequelize e todos os models

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json()); // habilita o parser de JSON
app.use('/files', express.static(resolve(__dirname, '..', 'uploads')));
app.use('/categories-files', express.static(resolve(__dirname, '..', 'uploads')));
app.use(router);

export default app;