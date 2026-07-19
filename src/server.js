import app from "./app.js";

app.get("/", (req, res) => {
  res.send("API funcionando 100%");
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});