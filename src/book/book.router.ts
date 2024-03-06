import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as BookService from "./book.service";

export const BookRouter = express.Router();

// GET: List all books
BookRouter.get("/", async (requrest: Request, response: Response) => {
  try {
    const books = await BookService.listBooks();
    return response.status(200).json(books);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET: Get a book by id
BookRouter.get("/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const book = await BookService.getBook(id);
    if (!book) {
      return response.status(404).json("Book not found");
    }
    return response.status(200).json(book);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

BookRouter.post(
  "/",
  body("title").isString(),
  body("datePublished").isDate().toDate(),
  body("isFiction").isBoolean(),
  body("authorId").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const book = request.body;
      const newBook = await BookService.createBook(book);
      return response.status(201).json(newBook);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
