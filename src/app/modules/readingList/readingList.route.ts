import express from "express";

import { ReadingListController } from "./readingList.controller";

const router = express.Router();

router.get("/:id", ReadingListController.getReadingList);
router.patch("/:id", ReadingListController.updateReadingList);
router.post("/", ReadingListController.addToReadingList);

export const ReadingListRoutes = router;
