import express, { Request, Response } from "express";
import {
  getAllComments,
  getCommentsByVerse,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/commentsController";

const router = express.Router();

// Get all comments
router.get("/", (req: Request, res: Response) => getAllComments(req, res));

// Get comments for a specific verse
router.get("/verse/:verseId", (req: Request, res: Response) =>
  getCommentsByVerse(req, res)
);

// Create a new comment
router.post("/", (req: Request, res: Response) => createComment(req, res));

// Update a Comment by ID
router.put("/:id", (req: Request, res: Response) => updateComment(req,res));

// Delete a comment by ID
router.delete("/:id", (req: Request, res: Response) => deleteComment(req, res));

export default router;
