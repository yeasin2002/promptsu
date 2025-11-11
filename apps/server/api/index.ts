import { handle } from "hono/vercel";

// Re-export from source since Vercel will build it
import app from "../src/index";

export default handle(app);
