import express from "express";

import { ReviewController } from "./review.controller";
import { verifyToken } from "../../middlewares/jwt";

const router = express.Router();

router.post("/", verifyToken, ReviewController.createReview);
router.get("/:id", ReviewController.getReviews);

export const ReviewRoute = router;
