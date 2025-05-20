// controllers/bookController.js
import bookModel from "../models/Book.js";
import reviewModel from "../models/Review.js";

const createBook = async (req, res) => {
  const book = new bookModel({ ...req.body, createdBy: req.user.id });
  await book.save();
  res.status(201).json(book);
};

const getBooks = async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, "i");
  if (genre) filter.genre = genre;

  const books = await bookModel.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(books);
};

const getBookDetails = async (req, res) => {
  const book = await bookModel.findById(req.params.id);
  const reviews = await reviewModel.find({ book: book._id });
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);
  res.json({ book, avgRating, reviews });
};

const searchBooks = async (req, res) => {
  const { q } = req.query;
  const books = await bookModel.find({
    $or: [
      { title: new RegExp(q, "i") },
      { author: new RegExp(q, "i") },
    ],
  });
  res.json(books);
};


export {createBook, getBooks, getBookDetails,searchBooks}