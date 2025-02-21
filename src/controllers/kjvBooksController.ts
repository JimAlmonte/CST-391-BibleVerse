import { Request, Response } from 'express';
import * as KjvBooksModel from '../models/KjvBooksModel';

/**
 * Get all books OR search by name if query is provided.
 */
export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.query;

    let books;
    if (name) {
      books = await KjvBooksModel.searchBookByName(String(name));
    } else {
      books = await KjvBooksModel.getAllBooks();
    }

    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Error fetching books' });
  }
};

/**
 * Get a book by ID.
 */
export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = Number(req.params.id);
    if (isNaN(bookId)) {
      res.status(400).json({ message: 'Invalid book ID' });
      return;
    }

    const book = await KjvBooksModel.getBookById(bookId);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Error fetching book' });
  }
};
