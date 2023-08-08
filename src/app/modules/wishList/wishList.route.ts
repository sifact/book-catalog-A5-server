import express from "express";
import { WishListController } from "./wishList.controller";
import { verifyToken } from "../../middlewares/jwt";

const router = express.Router();

router.post("/", verifyToken, WishListController.addToWishList);

router.get("/:id", WishListController.getWishList);

export const WishListRoutes = router;
