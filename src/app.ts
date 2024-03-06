import express, { Express, Request, Response } from "express";
import bookRoutes from "./routes/booksRoutes";
import authorRoutes from "./routes/authorsRoutes";
import categoryRoutes from "./routes/categoriesRoutes";
import mongoose from "mongoose";
import morgan from "morgan";

const app: Express = express();
const PORT = process.env.PORT || 3000;
// MongoDB connection string
const mongoURI =
  "mongodb+srv://harystylesdb:Di0qWPtw142UgBiA@harystyles.crttfh4.mongodb.net/?retryWrites=true&w=majority&appName=harystyles";

app.use(express.json()); // Middleware for JSON parsing
app.use(morgan("dev")); // Logging middleware

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});
app.use("/api", bookRoutes);
app.use("/api", authorRoutes);
app.use("/api", categoryRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

export default app;
