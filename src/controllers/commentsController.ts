import { Request, Response } from "express";
import * as CommentsModel from "../models/CommentsModel";

/**
 * Get all comments.
 */
export const getAllComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const comments = await CommentsModel.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

/**
 * Get comments by verse ID.
 */
export const getCommentsByVerse = async (req: Request, res: Response): Promise<void> => {
  try {
    const verseId = Number(req.params.verseId);
    if (isNaN(verseId)) {
      res.status(400).json({ message: "Invalid verse ID" });
      return;
    }
    
    const comments = await CommentsModel.getCommentsByVerse(verseId);
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments for verse:", error);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

/**
 * Create a new comment.
 */
export const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { verse_id, content } = req.body;

    if (!verse_id || !content) {
      res.status(400).json({ message: "Missing verse_id or content" });
      return;
    }

    const result = await CommentsModel.createComment(verse_id, content);
    res.status(201).json({ message: "Comment added", result });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Error creating comment" });
  }
};

/**
 * Update a comment by ID.
 */
export const updateComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const commentId = Number(req.params.id);
    const { content } = req.body;

    if (isNaN(commentId) || !content) {
      res.status(400).json({ message: "Invalid comment ID or missing content" });
      return;
    }

    const updated = await CommentsModel.updateComment(commentId, content);
    if (!updated) {
      res.status(404).json({ message: "Comment not found or no changes made" });
      return;
    }

    res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Error updating comment" });
  }
};

/**
 * Delete a comment by ID.
 */
export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid comment ID" });
      return;
    }

    const deleted = await CommentsModel.deleteComment(id);
    if (!deleted) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment" });
  }
};