import express from 'express';
import { getAllBooks, getBookById } from '../controllers/kjvBooksController';

const router = express.Router();

// ✅ Ensure correct order: General route first, dynamic route last
router.get('/', getAllBooks);
router.get('/:id', getBookById);

export default router;
