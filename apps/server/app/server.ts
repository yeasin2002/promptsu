import cors from "cors";
import express from "express";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  res.json({ message: "Hello World" });
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
