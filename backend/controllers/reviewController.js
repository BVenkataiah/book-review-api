// controllers/reviewController.js
import reviewModel from "../models/Review.js";

const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const review = new reviewModel({
    user: req.user.id,
    book: req.params.id,
    rating,
    comment,
  });
  await review.save();
  res.status(201).json(review);
};

const updateReview = async (req, res) => {
  const review = await reviewModel.findById(req.params.id);
  if (!review || review.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });

  review.rating = req.body.rating;
  review.comment = req.body.comment;
  await review.save();
  res.json(review);
};

const deleteReview = async (req, res) => {
  const review = await reviewModel.findById(req.params.id);
  if (!review || review.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });

  await review.deleteOne();
  res.json({ message: "Review deleted" });
};


export {createReview, updateReview,deleteReview}