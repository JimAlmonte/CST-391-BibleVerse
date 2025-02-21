import db from "../config/db";
import { RowDataPacket } from "mysql2"; // Import RowDataPacket

export interface KjvBook extends RowDataPacket { // Ensure KjvBook extends RowDataPacket
  id: number;
  name: string;
}

/**
 * Get all books.
 */
export const getAllBooks = async (): Promise<KjvBook[]> => {
  const [rows] = await db.query<KjvBook[] & RowDataPacket[]>("SELECT * FROM kjv_books");
  return rows;
};

/**
 * Get a book by ID.
 */
export const getBookById = async (id: number): Promise<KjvBook | null> => {
  const [rows] = await db.query<KjvBook[] & RowDataPacket[]>("SELECT * FROM kjv_books WHERE id = ?", [id]);
  return rows.length > 0 ? rows[0] : null;
};

/**
 * Search for a book by name (case-insensitive).
 */
export const searchBookByName = async (name: string): Promise<KjvBook[]> => {
  const searchQuery = `%${name}%`;
  const [rows] = await db.query<KjvBook[] & RowDataPacket[]>("SELECT * FROM kjv_books WHERE name LIKE ?", [searchQuery]);
  return rows;
};
