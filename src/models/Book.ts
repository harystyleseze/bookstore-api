import mongoose, { Document } from "mongoose";

interface IBook extends Document {
  title: string;
  author: mongoose.Types.ObjectId; // Assuming a reference to an Author document
  category: mongoose.Types.ObjectId; // Assuming a reference to a Category document
  publicationYear: number;
  ISBN: string;
}

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

const Book = mongoose.model<IBook>("Book", bookSchema);

export default Book;

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
