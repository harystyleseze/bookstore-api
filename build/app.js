"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksRoutes_1 = __importDefault(require("./routes/booksRoutes"));
const authorsRoutes_1 = __importDefault(require("./routes/authorsRoutes"));
const categoriesRoutes_1 = __importDefault(require("./routes/categoriesRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// MongoDB connection string
const mongoURI = "mongodb+srv://harystylesdb:Di0qWPtw142UgBiA@harystyles.crttfh4.mongodb.net/?retryWrites=true&w=majority&appName=harystyles";
app.use(express_1.default.json()); // Middleware for JSON parsing
app.use((0, morgan_1.default)("dev")); // Logging middleware
mongoose_1.default
    .connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
app.use("/api", booksRoutes_1.default);
app.use("/api", authorsRoutes_1.default);
app.use("/api", categoriesRoutes_1.default);
if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}
exports.default = app;
