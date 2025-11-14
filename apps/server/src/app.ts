import cors from "cors";
import express from "express";
import mainRouter from "./routes";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/api", mainRouter);

// Start the server
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
