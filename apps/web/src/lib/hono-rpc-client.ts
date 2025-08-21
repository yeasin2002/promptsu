import { hc } from "hono/client";
import type { AppType } from "../../../server/src";

export const honoClient = hc<AppType>(process.env.NEXT_PUBLIC_SERVER_URL || "");
