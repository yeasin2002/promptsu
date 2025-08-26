import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { trpcAppRouter } from "../../../server/src/routers";

export const trpc = createTRPCProxyClient<trpcAppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.VITE_SERVER_URL}/trpc`,
    }),
  ],
});
