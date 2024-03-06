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
const Category_1 = __importDefault(require("../models/Category"));
const router = express_1.default.Router();
// POST /categories - Create a new category
router.post("/categories", [(0, express_validator_1.body)("name").not().isEmpty().withMessage("Name is required")], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ error: "Validation failed", details: errors.array() });
    }
    try {
        const category = new Category_1.default(req.body);
        yield category.save();
        res.status(201).json(category);
    }
    catch (error) {
        console.error(error); // Log error for server-side review
        res
            .status(500)
            .json({ error: "An error occurred while creating the category." });
    }
}));
// GET /categories - Get all categories
router.get("/categories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.find({});
        res.json(categories);
    }
    catch (error) {
        console.error(error); // Log error for server-side review
        res.status(500).json({ error: "Failed to retrieve categories." });
    }
}));
// GET /categories/:id - Get a specific category by ID
router.get("/categories/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.default.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json(category);
    }
    catch (error) {
        console.error(error); // Log error for server-side review
        res.status(500).json({ error: "Failed to retrieve the category." });
    }
}));
// PUT /categories/:id - Update an existing category by ID
router.put("/categories/:id", [(0, express_validator_1.body)("name").not().isEmpty().withMessage("Name must not be empty")], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ error: "Validation failed", details: errors.array() });
    }
    try {
        const category = yield Category_1.default.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true, runValidators: true });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json(category);
    }
    catch (error) {
        console.error(error); // Log error for server-side review
        res.status(500).json({ error: "Failed to update the category." });
    }
}));
// DELETE /categories/:id - Delete a category by ID
router.delete("/categories/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.default.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json({ message: "Category successfully deleted" });
    }
    catch (error) {
        console.error(error); // Log error for server-side review
        res.status(500).json({ error: "Failed to delete the category." });
    }
}));
exports.default = router;
