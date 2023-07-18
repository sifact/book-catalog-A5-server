import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    bookId: {
      type: String,
      ref: "Book",
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Review = mongoose.model("Review", reviewSchema);
export default Review;
