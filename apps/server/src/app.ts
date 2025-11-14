import cors from "cors";
import type { Request, Response } from "express";
import express from "express";
import mainRouter from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.use("/api", mainRouter);

// Start the server (only when not in Vercel)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
  );
}

export default app;
