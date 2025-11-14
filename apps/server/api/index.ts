import cors from "cors";
import type { Request, Response } from "express";
import express from "express";
import mainRouter from "../src/routes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.use("/api", mainRouter);

export default app;
