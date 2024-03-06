"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    publicationYear: { type: Number, required: true },
    ISBN: { type: String, required: true },
});
/*
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  publicationYear: { type: Number, required: true },
  ISBN: { type: String, required: true },
});*/
const Book = mongoose_1.default.model("Book", bookSchema);
exports.default = Book;
/*import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  publicationYear: number;
  ISBN: string;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  publicationYear: { type: Number, required: true },
  ISBN: { type: String, required: true },
});

export default mongoose.model<IBook>("Book", BookSchema);
*/
