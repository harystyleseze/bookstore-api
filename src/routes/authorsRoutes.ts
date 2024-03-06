import express, { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Author from "../models/Author";

const router: Router = express.Router();

// POST /authors - Create a new author
router.post(
  "/authors",
  [body("name").not().isEmpty().withMessage("Name is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: errors.array() });
    }

    try {
      const author = new Author(req.body);
      await author.save();
      res.status(201).json(author);
    } catch (error) {
      console.error(error); // Log error for server-side review
      res
        .status(500)
        .json({ error: "An error occurred while creating the author." });
    }
  }
);

// GET /authors - Get all authors
router.get("/authors", async (req: Request, res: Response) => {
  try {
    const authors = await Author.find({});
    res.json(authors);
  } catch (error) {
    console.error(error); // Log error for server-side review
    res.status(500).json({ error: "Failed to retrieve authors." });
  }
});

// GET /authors/:id - Get a specific author by ID
router.get("/authors/:id", async (req: Request, res: Response) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.json(author);
  } catch (error) {
    console.error(error); // Log error for server-side review
    res.status(500).json({ error: "Failed to retrieve the author." });
  }
});

// PUT /authors/:id - Update an existing author by ID
router.put(
  "/authors/:id",
  [body("name").not().isEmpty().withMessage("Name must not be empty")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: errors.array() });
    }

    try {
      const author = await Author.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true, runValidators: true }
      );
      if (!author) {
        return res.status(404).json({ error: "Author not found" });
      }
      res.json(author);
    } catch (error) {
      console.error(error); // Log error for server-side review
      res.status(500).json({ error: "Failed to update the author." });
    }
  }
);

// DELETE /authors/:id - Delete an author by ID
router.delete("/authors/:id", async (req: Request, res: Response) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.json({ message: "Author successfully deleted" });
  } catch (error) {
    console.error(error); // Log error for server-side review
    res.status(500).json({ error: "Failed to delete the author." });
  }
});

export default router;
