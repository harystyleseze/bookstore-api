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
const Author_1 = __importDefault(require("../models/Author"));
const router = express_1.default.Router();
// POST /authors - Create a new author
router.post("/authors", [(0, express_validator_1.body)("name").not().isEmpty().withMessage("Name is required")], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ error: "Validation failed", details: errors.array() });
    }
    try {
        const author = new Author_1.default(req.body);
        yield author.save();
        res.status(201).json(author);
    }
    catch (error) {
        console.error(error); // Log error for server-side review
        res
            .status(500)
            .json({ error: "An error occurred while creating the author." });
    }
}));
// GET /authors - Get all authors
router.get("/authors", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield Author_1.default.find({});
        res.json(authors);
    }
    catch (error) {
        console.error(error); // Log error for server-side review
        res.status(500).json({ error: "Failed to retrieve authors." });
    }
}));
// GET /authors/:id - Get a specific author by ID
router.get("/authors/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = yield Author_1.default.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ error: "Author not found" });
        }
        res.json(author);
    }
    catch (error) {
        console.error(error); // Log error for server-side review
        res.status(500).json({ error: "Failed to retrieve the author." });
    }
}));
// PUT /authors/:id - Update an existing author by ID
router.put("/authors/:id", [(0, express_validator_1.body)("name").not().isEmpty().withMessage("Name must not be empty")], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ error: "Validation failed", details: errors.array() });
    }
    try {
        const author = yield Author_1.default.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true, runValidators: true });
        if (!author) {
            return res.status(404).json({ error: "Author not found" });
        }
        res.json(author);
    }
    catch (error) {
        console.error(error); // Log error for server-side review
        res.status(500).json({ error: "Failed to update the author." });
    }
}));
// DELETE /authors/:id - Delete an author by ID
router.delete("/authors/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = yield Author_1.default.findByIdAndDelete(req.params.id);
        if (!author) {
            return res.status(404).json({ error: "Author not found" });
        }
        res.json({ message: "Author successfully deleted" });
    }
    catch (error) {
        console.error(error); // Log error for server-side review
        res.status(500).json({ error: "Failed to delete the author." });
    }
}));
exports.default = router;
