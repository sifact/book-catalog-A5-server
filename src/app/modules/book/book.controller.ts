import { RequestHandler } from "express";
import Book from "./book.model";
import ApiError from "../../../errors/ApiError";

export const createBook: RequestHandler = async (req, res, next) => {
  const newBook = new Book({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    next(err);
  }
};
export const deleteBook: RequestHandler = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book?.userId !== req.userId)
      throw new ApiError(403, "You can delete only your book!");

    await Book.findByIdAndDelete(req.params.id);
    res.status(200).send("Book has been deleted!");
  } catch (err) {
    next(err);
  }
};
export const getBook: RequestHandler = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) throw new ApiError(404, "Book not found!");
    res.status(200).send(book);
  } catch (err) {
    next(err);
  }
};

export const getBooks: RequestHandler = async (req, res, next) => {
  const q = req.query;
  const filters = {
    // ...(q.userId && { userId: q.userId }),
    // ...(q.cat && { cat: q.cat }),
    // ...((q.min || q.max) && {
    //   price: {
    //     ...(q.min && { $gt: q.min }),
    //     ...(q.max && { $lt: q.max }),
    //   },
    // }),
    // ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const books = await Book.find(filters).sort();
    res.status(200).send(books);
  } catch (err) {
    next(err);
  }
};
