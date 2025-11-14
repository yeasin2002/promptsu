import cors from "cors";
import express from "express";
import { promptEnhancerService } from "./routes/prompt-enhancer.js";
import { testApiService } from "./routes/test-api-api.js";

const router = express();
router.use(cors());

const PORT = process.env.PORT || 3000;

router.get("/", (_req, res) => {
  res.send("Hello World!");
});

router.post("/prompt-enhancer", async (req, res) => {
  const input = req.body;
  const result = await promptEnhancerService(input);

  if (result.error) {
    return res.json({ error: result.error, data: null });
  }

  return res.json({ error: null, data: result.data });
});

router.post("/test-api", async (req, res) => {
  const input = req.body;
  console.log("input", input);
  const result = await testApiService(input);

  if (result.error) {
    return res.json({ error: result.error, data: null });
  }

  return res.json({ error: null, data: result.data });
});

// Start the server
router.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
