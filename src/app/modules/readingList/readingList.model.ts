import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

const readingListSchema = new Schema(
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
    isDone: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReadingList = mongoose.model("ReadingList", readingListSchema);

export default ReadingList;
