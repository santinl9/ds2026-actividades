import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";

import { registroSchema, loginSchema } from "../types/schemas/auth.schema.js";

const router = Router();

router.post("/registro", validate(registroSchema), authController.registrar);
router.post("/login",    validate(loginSchema),    authController.login);
router.get( "/yo",       authenticate,             authController.yo); 

export default router