"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const authorSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    // other fields
});
const Author = mongoose_1.default.model("Author", authorSchema);
exports.default = Author;
/*import mongoose, { Schema, Document } from "mongoose";

export interface IAuthor extends Document {
  name: string;
}

const AuthorSchema: Schema = new Schema({
  name: { type: String, required: true },
});

export default mongoose.model<IAuthor>("Author", AuthorSchema);
*/
