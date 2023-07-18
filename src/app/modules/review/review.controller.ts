import { RequestHandler } from "express";
import Review from "./review.model.js";

export const createReview: RequestHandler = async (req, res, next) => {
  try {
    const newReview = new Review({
      userId: req.userId,
      ...req.body,
    });

    const savedReview = await newReview.save();
    // try {
    //   const review = await Review.findOne({
    //     gigId: req.body.gigId,
    //     userId: req.userId,
    //   });

    //   if (review)
    //     return next(
    //       createError(403, "You have already created a review for this gig!")
    //     );

    //TODO: check if the user purchased the gig.

    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const reviews = await Review.find({ id });

    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};

export const ReviewController = {
  createReview,
  getReviews,
};
