import { Request, Response } from "express";
import * as KjvVersesModel from "../models/KjvVersesModel";

/**
 * Get all verses.
 */
export const getAllVerses = async (_req: Request, res: Response): Promise<void> => {
  try {
    const verses = await KjvVersesModel.getAllVerses();
    res.status(200).json(verses);
  } catch (error) {
    console.error("Error fetching verses:", error);
    res.status(500).json({ message: "Error fetching verses" });
  }
};

/**
 * Get a verse by ID.
 */
export const getVerseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const verseId = Number(req.params.id);
    if (isNaN(verseId)) {
      res.status(400).json({ message: "Invalid verse ID" });
      return;
    }

    const verse = await KjvVersesModel.getVerseById(verseId);
    if (!verse) {
      res.status(404).json({ message: "Verse not found" });
      return;
    }

    res.status(200).json(verse);
  } catch (error) {
    console.error("Error fetching verse:", error);
    res.status(500).json({ message: "Error fetching verse" });
  }
};

/**
 * Get verses by Book ID.
 */
export const getVersesByBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = Number(req.params.bookId);
    if (isNaN(bookId)) {
      res.status(400).json({ message: "Invalid book ID" });
      return;
    }

    const verses = await KjvVersesModel.getVersesByBook(bookId);
    res.status(200).json(verses);
  } catch (error) {
    console.error("Error fetching verses:", error);
    res.status(500).json({ message: "Error fetching verses" });
  }
};

/**
 * Get verses by Book and Chapter.
 */
export const getVersesByChapter = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = Number(req.params.bookId);
    const chapter = Number(req.params.chapter);

    if (isNaN(bookId) || isNaN(chapter)) {
      res.status(400).json({ message: "Invalid book ID or chapter number" });
      return;
    }

    const verses = await KjvVersesModel.getVersesByChapter(bookId, chapter);
    res.status(200).json(verses);
  } catch (error) {
    console.error("Error fetching verses:", error);
    res.status(500).json({ message: "Error fetching verses" });
  }
};
