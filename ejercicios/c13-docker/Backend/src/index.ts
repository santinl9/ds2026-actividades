import express from "express"; //hace que la definición de api's sean menos tediosas.

const app = express();
const PORT = process.env.PORT; //el port es 3000 como podría haber sido cualquier otro (dentro de los no-conocidos)
  //puede leer process.env.PORT porque docker-compose.yml tiene "env_file: - backend/.env"

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería — ¡hola desde un contenedor! 🐳" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});