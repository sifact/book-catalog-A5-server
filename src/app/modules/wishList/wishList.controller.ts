import { RequestHandler } from "express";
import WishList from "./wishList.model";
import ApiError from "../../../errors/ApiError";

export const addToWishList: RequestHandler = async (req, res, next) => {
  console.log(req.body);

  try {
    const book = await WishList.findOne({
      $and: [{ bookId: req.body.bookId }, { userId: req.body.userId }],
    });

    if (book) throw new ApiError(409, "Book is already added...");

    const savedBook = await WishList.create(req.body);

    res.status(200).json(savedBook);
  } catch (err) {
    next(err);
  }
};

export const getWishList: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const books = await WishList.find({ userId: id }).populate("bookId");
    res.status(201).json(books);
  } catch (error) {
    throw new ApiError(404, "not found");
  }
};

export const WishListController = {
  addToWishList,
  getWishList,
};
