import express from "express";
import { getAllTranslations } from "../controllers/translationsController";

const router = express.Router();

// Get all available translations
router.get("/", getAllTranslations);

export default router;
