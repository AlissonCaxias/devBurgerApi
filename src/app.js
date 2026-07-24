import express from "express";

import router from "./routes.js";
import "./database/index.js"; // inicializa Sequelize e todos os models

const app = express();

app.use(express.json()); // habilita o parser de JSON

app.use(router);

export default app;