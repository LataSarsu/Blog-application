const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const blogRoutes = require("./routes/blogRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

app.use("/api", blogRoutes);

// Define a basic route
app.get("/", (req, res) => {
  res.send("Welcome to the MERN Blog API!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
