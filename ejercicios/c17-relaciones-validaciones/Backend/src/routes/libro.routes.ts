import { Router } from "express";
import * as libroController from "../controllers/libro.controller.js";
import { validate } from "../middlewares/validate.middleware.js";

import { LibroCreateSchema, LibroUpdateSchema } from "../types/schemas/libro.schema.js";



const router = Router();

router.get("/", libroController.getAll);
router.get("/:id", libroController.getById);
router.post("/", validate(LibroCreateSchema), libroController.create);
router.put("/:id", validate(LibroUpdateSchema), libroController.update);
router.delete("/:id", libroController.remove);

export default router;