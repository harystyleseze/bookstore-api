"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const Book_1 = __importDefault(require("../models/Book"));
const Author_1 = __importDefault(require("../models/Author"));
const Category_1 = __importDefault(require("../models/Category"));
const router = express_1.default.Router();
//Post /book - create a new book that looks up author and category name
router.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Simplified for clarity
    try {
        const author = yield Author_1.default.findOne({ name: req.body.author });
        const category = yield Category_1.default.findOne({ name: req.body.category });
        if (!author || !category) {
            return res.status(404).json({ error: "Author or category not found" });
        }
        const book = new Book_1.default(Object.assign(Object.assign({}, req.body), { author: author._id, category: category._id }));
        yield book.save();
        res.status(201).json(book);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "An error occurred while creating the book." });
    }
}));
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
router.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield Book_1.default.find({});
        res.json(books);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve books." });
    }
}));
// GET /books/:id - Get a specific book by ID
router.get("/books/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book_1.default.findById(req.params.id).populate("author category");
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(book);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve the book." });
    }
}));
// PUT /books/:id - Update an existing book by ID
router.put("/books/:id", [
    (0, express_validator_1.body)("title")
        .optional()
        .not()
        .isEmpty()
        .withMessage("Title must not be empty"),
    (0, express_validator_1.body)("author")
        .optional()
        .not()
        .isEmpty()
        .withMessage("Author name must not be empty"),
    (0, express_validator_1.body)("category")
        .optional()
        .not()
        .isEmpty()
        .withMessage("Category name must not be empty"),
    (0, express_validator_1.body)("publicationYear")
        .optional()
        .isNumeric()
        .withMessage("Publication Year must be a number"),
    (0, express_validator_1.body)("ISBN")
        .optional()
        .not()
        .isEmpty()
        .withMessage("ISBN must not be empty"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ error: "Validation failed", details: errors.array() });
    }
    // Resolve author and category names to IDs
    let authorId, categoryId;
    if (req.body.author) {
        const author = yield Author_1.default.findOne({ name: req.body.author });
        if (!author) {
            return res.status(404).json({ error: "Author not found" });
        }
        authorId = author._id;
    }
    if (req.body.category) {
        const category = yield Category_1.default.findOne({ name: req.body.category });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        categoryId = category._id;
    }
    try {
        // Construct update object, only including fields that were provided in the request body
        const update = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (req.body.title && { title: req.body.title })), (authorId && { author: authorId })), (categoryId && { category: categoryId })), (req.body.publicationYear && {
            publicationYear: req.body.publicationYear,
        })), (req.body.ISBN && { ISBN: req.body.ISBN }));
        const book = yield Book_1.default.findByIdAndUpdate(req.params.id, update, {
            new: true,
            runValidators: true,
        });
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(book);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update the book." });
    }
}));
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
router.delete("/books/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book_1.default.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json({ message: "Book successfully deleted" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete the book." });
    }
}));
exports.default = router;
