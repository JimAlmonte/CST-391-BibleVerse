import db from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Comment extends RowDataPacket {
  id?: number;
  verse_id: number;
  content: string;
  CreatedAt?: Date;
}

/**
 * Get all comments.
 */
export const getAllComments = async (): Promise<Comment[]> => {
  const [rows] = await db.query<Comment[] & RowDataPacket[]>("SELECT * FROM comments");
  return rows;
};

/**
 * Get comments by verse ID.
 */
export const getCommentsByVerse = async (verseId: number): Promise<Comment[]> => {
  const [rows] = await db.query<Comment[] & RowDataPacket[]>("SELECT * FROM comments WHERE verse_id = ?", [verseId]);
  return rows;
};

/**
 * Create a new comment.
 */
export const createComment = async (verseId: number, content: string): Promise<number> => {
  const [result] = await db.query<ResultSetHeader>(
    "INSERT INTO comments (verse_id, content, CreatedAt) VALUES (?, ?, NOW())",
    [verseId, content]
  );
  return result.insertId; // Return the ID of the newly created comment
};

/**
 * Update a comment by ID.
 */
export const updateComment = async (id: number, content: string): Promise<boolean> => {
  const [result] = await db.query<ResultSetHeader>(
    "UPDATE comments SET content = ?, CreatedAt = NOW() WHERE id = ?",
    [content, id]
  );

  return result.affectedRows > 0;
};

/**
 * Delete a comment by ID.
 */
export const deleteComment = async (id: number): Promise<boolean> => {
  const [result] = await db.query<ResultSetHeader>("DELETE FROM comments WHERE id = ?", [id]);
  return result.affectedRows > 0;
};