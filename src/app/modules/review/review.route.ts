import express from "express";
import { verifyToken } from "../../middlewares/jwt";
import { ReviewController } from "./review.controller.js";

const router = express.Router();

router.post("/", verifyToken, ReviewController.createReview);
router.get("/:id", ReviewController.getReviews);

export default router;
