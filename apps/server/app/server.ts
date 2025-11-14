import cors from "cors";
import express from "express";
import AiRouter from "./routes/index.js";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/", AiRouter);

app.get("/", (_req, res) => {
  res.json({ message: "Hello World" });
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
