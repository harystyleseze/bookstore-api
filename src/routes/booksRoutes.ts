import express, { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Book from "../models/Book";
import Author from "../models/Author";
import Category from "../models/Category";

const router: Router = express.Router();

//Post /book - create a new book that looks up author and category name
router.post("/books", async (req: Request, res: Response) => {
  // Simplified for clarity
  try {
    const author = await Author.findOne({ name: req.body.author });
    const category = await Category.findOne({ name: req.body.category });

    if (!author || !category) {
      return res.status(404).json({ error: "Author or category not found" });
    }

    const book = new Book({
      ...req.body,
      author: author._id,
      category: category._id,
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the book." });
  }
});

/*
// POST /books - Create a new book
router.post(
  "/books",
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("author").not().isEmpty().withMessage("Author is required"),
    body("category").not().isEmpty().withMessage("Category is required"),
    body("publicationYear")
      .isNumeric()
      .withMessage("Publication Year must be a number"),
    body("ISBN").not().isEmpty().withMessage("ISBN is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: errors.array() });
    }

    try {
      const book = new Book(req.body);
      await book.save();
      res.status(201).json(book);
    } catch (error) {
      console.error(error); // Log the error for server-side review
      res
        .status(500)
        .json({ error: "An error occurred while creating the book." });
    }
  }
);*/

// GET /books - Get all books
router.get("/books", async (req: Request, res: Response) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve books." });
  }
});

// GET /books/:id - Get a specific book by ID
router.get("/books/:id", async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id).populate("author category");
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve the book." });
  }
});

// PUT /books/:id - Update an existing book by ID
router.put(
  "/books/:id",
  [
    body("title")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Title must not be empty"),
    body("author")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Author name must not be empty"),
    body("category")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Category name must not be empty"),
    body("publicationYear")
      .optional()
      .isNumeric()
      .withMessage("Publication Year must be a number"),
    body("ISBN")
      .optional()
      .not()
      .isEmpty()
      .withMessage("ISBN must not be empty"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: errors.array() });
    }

    // Resolve author and category names to IDs
    let authorId, categoryId;
    if (req.body.author) {
      const author = await Author.findOne({ name: req.body.author });
      if (!author) {
        return res.status(404).json({ error: "Author not found" });
      }
      authorId = author._id;
    }
    if (req.body.category) {
      const category = await Category.findOne({ name: req.body.category });
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      categoryId = category._id;
    }

    try {
      // Construct update object, only including fields that were provided in the request body
      const update = {
        ...(req.body.title && { title: req.body.title }),
        ...(authorId && { author: authorId }),
        ...(categoryId && { category: categoryId }),
        ...(req.body.publicationYear && {
          publicationYear: req.body.publicationYear,
        }),
        ...(req.body.ISBN && { ISBN: req.body.ISBN }),
      };

      const book = await Book.findByIdAndUpdate(req.params.id, update, {
        new: true,
        runValidators: true,
      });
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update the book." });
    }
  }
);

/*
// PUT /books/:id - Update an existing book by ID
router.put(
  "/books/:id",
  [
    body("title")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Title must not be empty"),
    body("author")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Author must not be empty"),
    body("category")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Category must not be empty"),
    body("publicationYear")
      .optional()
      .isNumeric()
      .withMessage("Publication Year must be a number"),
    body("ISBN")
      .optional()
      .not()
      .isEmpty()
      .withMessage("ISBN must not be empty"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: errors.array() });
    }

    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update the book." });
    }
  }
);
*/
// DELETE /books/:id - Delete a book by ID
router.delete("/books/:id", async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the book." });
  }
});

export default router;
