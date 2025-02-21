import db from "../config/db";
import { RowDataPacket } from "mysql2"; // Import RowDataPacket

export interface KjvVerse extends RowDataPacket {
  id: number;
  book_id: number;
  chapter: number;
  verse: number;
  text: string;
}

/**
 * Get all verses.
 */
export const getAllVerses = async (): Promise<KjvVerse[]> => {
  const [rows] = await db.query<KjvVerse[] & RowDataPacket[]>("SELECT * FROM kjv_verses");
  return rows;
};

/**
 * Get a verse by ID.
 */
export const getVerseById = async (id: number): Promise<KjvVerse | null> => {
  const [rows] = await db.query<KjvVerse[] & RowDataPacket[]>("SELECT * FROM kjv_verses WHERE id = ?", [id]);
  return rows.length > 0 ? rows[0] : null;
};

/**
 * Get verses by Book ID.
 */
export const getVersesByBook = async (bookId: number): Promise<KjvVerse[]> => {
  const [rows] = await db.query<KjvVerse[] & RowDataPacket[]>("SELECT * FROM kjv_verses WHERE book_id = ?", [bookId]);
  return rows;
};

/**
 * Get verses by Book and Chapter.
 */
export const getVersesByChapter = async (bookId: number, chapter: number): Promise<KjvVerse[]> => {
  const [rows] = await db.query<KjvVerse[] & RowDataPacket[]>(
    "SELECT * FROM kjv_verses WHERE book_id = ? AND chapter = ?",
    [bookId, chapter]
  );
  return rows;
};
