import mongoose from "mongoose";
const { Schema } = mongoose;

const wishListSchema = new Schema(
  {
    bookId: {
      type: String,
      ref: "Book",
      required: true,
    },

    userId: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WishList = mongoose.model("WishList", wishListSchema);

export default WishList;
