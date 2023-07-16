import { RequestHandler } from "express";
import Book from "./book.model";
import ApiError from "../../../errors/ApiError";
import { JwtPayload } from "jsonwebtoken";

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
    console.log(book);
    console.log(book?.userId, req.userId);
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

export const updateBook: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const updateData = req.body;

  try {
    const isExist = await Book.findById(id);

    if (!isExist) {
      throw new ApiError(400, "Book not found !");
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated object
      runValidators: true, // Run Mongoose validation on the updateData
    });
    res.status(200).send(updatedBook);
  } catch (error) {
    next(error);
  }
};
