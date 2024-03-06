import express, { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Category from "../models/Category";

const router: Router = express.Router();

// POST /categories - Create a new category
router.post(
  "/categories",
  [body("name").not().isEmpty().withMessage("Name is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: errors.array() });
    }

    try {
      const category = new Category(req.body);
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      console.error(error); // Log error for server-side review
      res
        .status(500)
        .json({ error: "An error occurred while creating the category." });
    }
  }
);

// GET /categories - Get all categories
router.get("/categories", async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    console.error(error); // Log error for server-side review
    res.status(500).json({ error: "Failed to retrieve categories." });
  }
});

// GET /categories/:id - Get a specific category by ID
router.get("/categories/:id", async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.error(error); // Log error for server-side review
    res.status(500).json({ error: "Failed to retrieve the category." });
  }
});

// PUT /categories/:id - Update an existing category by ID
router.put(
  "/categories/:id",
  [body("name").not().isEmpty().withMessage("Name must not be empty")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: errors.array() });
    }

    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true, runValidators: true }
      );
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error(error); // Log error for server-side review
      res.status(500).json({ error: "Failed to update the category." });
    }
  }
);

// DELETE /categories/:id - Delete a category by ID
router.delete("/categories/:id", async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ message: "Category successfully deleted" });
  } catch (error) {
    console.error(error); // Log error for server-side review
    res.status(500).json({ error: "Failed to delete the category." });
  }
});

export default router;
