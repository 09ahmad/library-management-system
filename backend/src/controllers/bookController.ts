import { Request, Response } from 'express';
import { db } from '../models/database';
import { BookAvailability } from '../models/types';

export class BookController {
  static getAllBooks = (req: Request, res: Response) => {
    const books = db.getAllBooks();
    res.json({ success: true, data: books });
  };

  static searchBooks = (req: Request, res: Response) => {
    const { bookName, author, category } = req.query;

    if (!bookName && !author && !category) {
      return res.status(400).json({ 
        success: false, 
        message: 'At least one search field is required' 
      });
    }

    const filters: any = {};
    if (bookName) filters.bookName = bookName as string;
    if (author) filters.author = author as string;
    if (category) filters.category = category as string;

    const results = db.searchBooks(filters);
    res.json({ success: true, data: results });
  };

  static getBookBySerial = (req: Request, res: Response) => {
    const { serialNo } = req.params;
    const book = db.findBookBySerial(serialNo);

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.json({ success: true, data: book });
  };

  static addBook = (req: Request, res: Response) => {
    const { bookName, author, category, serialNo } = req.body;

    if (!bookName || !author || !category || !serialNo) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    const existingBook = db.findBookBySerial(serialNo);
    if (existingBook) {
      return res.status(400).json({ 
        success: false, 
        message: 'Book with this serial number already exists' 
      });
    }

    const newBook = {
      bookName,
      author,
      category,
      serialNo,
      availability: BookAvailability.AVAILABLE
    };

    db.addBook(newBook);
    res.json({ success: true, data: newBook, message: 'Book added successfully' });
  };

  static updateBook = (req: Request, res: Response) => {
    const { serialNo } = req.params;
    const { bookName, author, category } = req.body;

    const existingBook = db.findBookBySerial(serialNo);
    if (!existingBook) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    const updates: any = {};
    if (bookName) updates.bookName = bookName;
    if (author) updates.author = author;
    if (category) updates.category = category;

    const success = db.updateBook(serialNo, updates);
    if (success) {
      const updatedBook = db.findBookBySerial(serialNo);
      res.json({ success: true, data: updatedBook, message: 'Book updated successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to update book' });
    }
  };
}
