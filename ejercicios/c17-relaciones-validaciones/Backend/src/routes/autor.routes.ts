import { Router } from "express";
import * as autorController from "../controllers/autor.controller.js";
import { validate } from "../middlewares/validate.middleware.js";

import { AutorCreateSchema, AutorUpdateSchema } from "../types/schemas/autor.schema.js";



const router = Router();

router.get("/", autorController.getAll);
router.get("/:id", autorController.getById);
router.post("/", validate(AutorCreateSchema), autorController.create);
router.put("/:id", validate(AutorUpdateSchema), autorController.update);
router.delete("/:id", autorController.remove);

export default router;