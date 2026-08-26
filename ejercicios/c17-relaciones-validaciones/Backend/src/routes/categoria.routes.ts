import { Router } from "express";
import * as categoriaController from "../controllers/categoria.controller.js";
import { validate } from "../middlewares/validate.middleware.js";

import { CategoriaCreateSchema, CategoriaUpdateSchema } from "../types/schemas/categoria.schema.js";

const router = Router();

router.get("/", categoriaController.getAll);    // /categorias?libros==true
router.get("/:id", categoriaController.getById);    // /categorias/id?libros==true
router.post("/", validate(CategoriaCreateSchema), categoriaController.create);
router.put("/:id", validate(CategoriaUpdateSchema), categoriaController.update);
router.delete("/:id", categoriaController.remove);

export default router;