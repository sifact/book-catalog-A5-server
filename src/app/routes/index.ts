import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BookRoutes } from "../modules/book/book.route";
import { ReviewRoute } from "../modules/review/review.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/book",
    route: BookRoutes,
  },
  {
    path: "/review",
    route: ReviewRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
