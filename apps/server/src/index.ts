import "dotenv/config";

// import { apiReference } from "@scalar/hono-api-reference";
import chalk from 'chalk';
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import apiRouter from "./api/openapi";
import { auth } from "./lib/auth";

const app = new Hono({ strict: true });

app.use(logger());

// app.use(
//   cors({
//     origin: ['http://10.10.13.40:3001', 'http://localhost:3001', 'https://chatgpt.com'],
//     allowHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   })
// );

app.use("/*", cors());

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.get("/", (c) => {
  return c.json({ message: "Hello World" });
});

// Mount API routes with OpenAPI
app.route("/api", apiRouter);

// Scalar API documentation
// app.get(
//   "/docs",
//   apiReference({
//     pageTitle: "API Documentation",
//     theme: "deepSpace",
//     url: "/api/openapi.json",
//   })
// );

app.onError((err, c) => {
  console.error(chalk.bgRed.white('Global error : '), err);
  return c.json({ success: false, message: err?.message || 'Something went wrong' }, 500);
});

export default app;
