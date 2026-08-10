import express from "express";
import LibroRoutes from "./routes/LibroRoutes.js";
import AutorRoutes from "./routes/AutorRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/libros", LibroRoutes);
app.use("/api/autores", AutorRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});