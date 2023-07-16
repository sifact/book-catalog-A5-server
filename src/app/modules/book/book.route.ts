import express from "express";
import { verifyToken } from "../../middlewares/jwt";
import { createBook, deleteBook, getBook, getBooks } from "./book.controller";

const router = express.Router();

router.post("/", verifyToken, createBook);
router.delete("/:id", verifyToken, deleteBook);
router.get("/single/:id", getBook);
router.get("/", getBooks);

export const BookRoutes = router;
