import { RequestHandler } from "express";

import ReadingList from "./readingList.model";
import ApiError from "../../../errors/ApiError";

export const addToReadingList: RequestHandler = async (req, res, next) => {
  try {
    const book = await ReadingList.findOne({
      $and: [{ bookId: req.body.bookId }, { userId: req.body.userId }],
    });

    if (book) throw new ApiError(404, "Book is already added...");

    const list = await ReadingList.create(req.body);
    res.status(201).json(list);
  } catch (err) {
    next(err);
  }
};

export const getReadingList: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const books = await ReadingList.find({ userId: id }).populate("bookId");
    res.status(201).json(books);
  } catch (error) {
    throw new ApiError(404, "not found");
  }
};

export const updateReadingList: RequestHandler = async (req, res, next) => {
  const id = req.params.id;

  try {
    const updatedBook = await ReadingList.findOneAndUpdate(
      { bookId: id },
      { isDone: true },
      {
        new: true, // Return the updated object
        runValidators: true, // Run Mongoose validation on the updateData
      }
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const ReadingListController = {
  addToReadingList,
  getReadingList,
  updateReadingList,
};
