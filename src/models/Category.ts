import mongoose, { Document } from "mongoose";

interface ICategory extends Document {
  name: string;
}

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;

/*
import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
});

export default mongoose.model<ICategory>("Category", CategorySchema);
*/
