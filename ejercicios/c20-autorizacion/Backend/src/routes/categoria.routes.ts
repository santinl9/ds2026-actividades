import { Router } from "express";
import * as categoriaController from "../controllers/categoria.controller.js";

import { validate, validateParams } from "../middlewares/validate.middleware.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

import { CategoriaCreateSchema, CategoriaUpdateSchema } from "../types/schemas/categoria.schema.js";
import { ParamSchema } from "../types/schemas/param.schema.js";


const router = Router();

router.get("/",         categoriaController.getAll);    // /categorias?libros==true
router.get("/:id",      validateParams(ParamSchema),                                    categoriaController.getById);   // /categorias/id?libros==true
router.post("/",        authenticate,   authorize("CLIENTE"),     validate(CategoriaCreateSchema),                                categoriaController.create);
router.put("/:id",      authenticate,   authorize("CLIENTE"),     validateParams(ParamSchema), validate(CategoriaUpdateSchema),   categoriaController.update);
router.delete("/:id",   authenticate,   authorize("ADMIN"),     validateParams(ParamSchema),                                    categoriaController.remove);

export default router;