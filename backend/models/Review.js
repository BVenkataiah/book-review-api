// models/Review.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
});
reviewSchema.index({ user: 1, book: 1 }, { unique: true }); // One review per user/book
const reviewModel = mongoose.model("Review", reviewSchema);
export default reviewModel
