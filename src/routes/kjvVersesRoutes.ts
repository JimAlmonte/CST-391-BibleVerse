import express from "express";
import { getAllVerses, getVerseById, getVersesByBook, getVersesByChapter } from "../controllers/kjvVersesController";

const router = express.Router();

// ✅ Get all verses
router.get("/", getAllVerses);

// ✅ Get a verse by ID
router.get("/:id", getVerseById);

// ✅ Get verses by Book ID
router.get("/book/:bookId", getVersesByBook);

// ✅ Get verses by Book and Chapter
router.get("/book/:bookId/chapter/:chapter", getVersesByChapter);

export default router;
