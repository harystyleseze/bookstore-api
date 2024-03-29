import mongoose from "mongoose";

interface IAuthor {
  name: string;
  // other properties
}

const authorSchema = new mongoose.Schema<IAuthor>({
  name: { type: String, required: true },
  // other fields
});

const Author = mongoose.model<IAuthor>("Author", authorSchema);

export default Author;

/*import mongoose, { Schema, Document } from "mongoose";

export interface IAuthor extends Document {
  name: string;
}

const AuthorSchema: Schema = new Schema({
  name: { type: String, required: true },
});

export default mongoose.model<IAuthor>("Author", AuthorSchema);
*/
