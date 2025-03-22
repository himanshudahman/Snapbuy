import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroute.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import cors from "cors";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Connect to database
connectDB();

// Routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce website</h1>");
});

// Start server
const PORT = process.env.PORT || 8080; // Default to 8080 if no .env variable
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
