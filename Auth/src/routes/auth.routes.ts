import express from "express";
import validateResource from "../middleware/validateResourse";
import { createSessionHandler } from "../controller/auth.controller";
import { createSessionSchema } from "../schema/auth.schema";

const router = express.Router();

router.post(
  "/api/sessions",
  validateResource(createSessionSchema),
  createSessionHandler
);

export default router;
