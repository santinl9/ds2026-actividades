import { Router } from "express";
import * as autorController from "../controllers/autor.controller.js";
import { validate, validateParams} from "../middlewares/validate.middleware.js";

import { AutorCreateSchema, AutorUpdateSchema } from "../types/schemas/autor.schema.js";
import { ParamSchema } from "../types/schemas/param.schema.js";



const router = Router();

router.get("/", autorController.getAll);
router.get("/:id", validateParams(ParamSchema), autorController.getById);
router.post("/", validate(AutorCreateSchema), autorController.create);
router.put("/:id", validateParams(ParamSchema), validate(AutorUpdateSchema), autorController.update);
router.delete("/:id", validateParams(ParamSchema), autorController.remove);

export default router;