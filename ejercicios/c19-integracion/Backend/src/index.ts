import express from "express";

import authRoutes from "./routes/auth.routes.js";
import LibroRoutes from "./routes/libro.routes.js";
import AutorRoutes from "./routes/autor.routes.js";
import CategoriaRoutes from './routes/categoria.routes.js';

import { errorHandler } from "./middlewares/error.middleware.js";

import cors from "cors";


const app = express();
const PORT = process.env.PORT;

const corsOptions = {
    origin: [process.env.FRONTEND_URL ?? "http://localhost:5173"]
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/libros", LibroRoutes);
app.use("/api/autores", AutorRoutes);
app.use("/api/categorias", CategoriaRoutes)

app.use((_req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

app.use(errorHandler); 

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});