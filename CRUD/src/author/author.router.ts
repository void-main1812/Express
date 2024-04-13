import express, { response } from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as AuthorService from "./author.service";

export const authorRouter = express.Router();

// GET: get all authors
authorRouter.get("/", async (request: Request, response: Response) => {
  try {
    const authors = await AuthorService.listAuthors();
    return response.status(200).json(authors);
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});

// GET: get an author by id
// params: id - the id of the author
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

// POST: create a new author
// body: firstName, lastName
authorRouter.post(
  "/",
  body("firstName").isString(),
  body("lastName").isString(),
  async (request: Request, response: Response) => {
    // checking for validation errors in the request
    const errors = validationResult(request);
    // if there are errors, return a 400 response with the errors
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      // create a new author
      const { firstName, lastName } = request.body;
      // call the createAuthor function from the author service
      const newAuthor = await AuthorService.createAuthor({
        firstName,
        lastName,
      });
      return response.status(201).json(newAuthor);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
);

// PUT: update an author by id
// params: id - the id of the author, body: firstName, lastName
authorRouter.put(
  "/:id",
  body("firstName").isString(),
  body("lastName").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const id: string = request.params.id;
      const author = request.body;
      const updatedAuthor = await AuthorService.updateAuthor(author, id);
      return response.status(200).json(updatedAuthor);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
);

// DELETE: delete an author by id
// params: id - the id of the author
authorRouter.delete("/:id", async (request: Request, response: Response) => {
  try {
    const id: string = request.params.id;
    await AuthorService.deleteAuthor(id);
    return response.status(204).json("Author deleted successfully");
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});