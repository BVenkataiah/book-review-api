// routes/bookRoutes.js
import express from 'express'
import authenticate from '../middleware/authMiddleware.js';
const bookRouter = express.Router();

import  {
  createBook,
  getBooks,
  getBookDetails,
  searchBooks,
} from '../controllers/bookController.js'

bookRouter.post("/books", authenticate, createBook);
bookRouter.get("/books", getBooks);
bookRouter.get("/books/:id", getBookDetails);
bookRouter.get("/search", searchBooks);

export default bookRouter;


