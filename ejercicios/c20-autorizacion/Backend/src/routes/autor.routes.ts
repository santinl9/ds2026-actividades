import { Router } from "express";
import * as autorController from "../controllers/autor.controller.js";

import { validate, validateParams} from "../middlewares/validate.middleware.js";
import { authorize, authenticate } from "../middlewares/auth.middleware.js";

import { AutorCreateSchema, AutorUpdateSchema } from "../types/schemas/autor.schema.js";
import { ParamSchema } from "../types/schemas/param.schema.js";

const router = Router();

router.get("/",         autorController.getAll);    // /autores/id?libros==true
router.get("/:id",      validateParams(ParamSchema),                                                        autorController.getById);   // /autores/id?libros==true
router.post("/",        authenticate,   authorize("ADMIN"),   validate(AutorCreateSchema),                                autorController.create);
router.put("/:id",      authenticate,   authorize("ADMIN"),   validateParams(ParamSchema), validate(AutorUpdateSchema),   autorController.update);
router.delete("/:id",   authenticate,   authorize("ADMIN"),     validateParams(ParamSchema),                                autorController.remove);

export default router;