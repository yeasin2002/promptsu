import express from "express";
import type { Request, Response } from "express";
import { promptEnhancerService } from "./prompt-enhancer";
import { testApiService } from "./test-api-api";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

router.post("/prompt-enhancer", async (req: Request, res: Response) => {
  const input = req.body;
  const result = await promptEnhancerService(input);

  if (result.error) {
    return res.json({ error: result.error, data: null });
  }

  return res.json({ error: null, data: result.data });
});

router.post("/test-api", async (req: Request, res: Response) => {
  const input = req.body;
  console.log("input", input);
  const result = await testApiService(input);

  if (result.error) {
    return res.json({ error: result.error, data: null });
  }

  return res.json({ error: null, data: result.data });
});

export default router;
