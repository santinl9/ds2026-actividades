import { Router } from "express";
import * as libroController from "../controllers/libro.controller.js";

import { validate, validateParams } from "../middlewares/validate.middleware.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

import { LibroCreateSchema, LibroUpdateSchema } from "../types/schemas/libro.schema.js";
import { ParamSchema } from "../types/schemas/param.schema.js";



const router = Router();

router.get("/",         libroController.getAll);
router.get("/:id",      validateParams(ParamSchema),                                    libroController.getById);
router.post("/",        authenticate,   authorize("ADMIN"),     validate(LibroCreateSchema),                                    libroController.create);
router.put("/:id",      authenticate,   authorize("ADMIN"),     validateParams(ParamSchema), validate(LibroUpdateSchema),       libroController.update);
router.delete("/:id",   authenticate,   authorize("ADMIN"),     validateParams(ParamSchema),                                    libroController.remove);

export default router;