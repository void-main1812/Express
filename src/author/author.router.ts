import express, { response } from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as AuthorService from "./author.service";

export const authorRouter = express.Router();

// Get a list of authors

authorRouter.get("/", async (request: Request, response: Response) => {
  try {
    const authors = await AuthorService.listAuthors();
    return response.status(200).json(authors);
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});

// Get an author by id
authorRouter.get("/:id", async (request: Request, response: Response) => {
  const id: string = request.params.id;

  try {
    const author = await AuthorService.getAuthor(id);
    if (author) {
      return response.status(200).json(author);
    } else {
      return response.status(404).json({ message: "Author not found" });
    }
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});

// authorRouter.post("/",)
