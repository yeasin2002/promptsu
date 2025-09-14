import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import type { appRouter } from "../../../server/src/routers";

const link = new RPCLink({
	url: "http://127.0.0.1:3000/rpc",
	// headers: { Authorization: "Bearer token" },
});

export const orpc: RouterClient<typeof appRouter> = createORPCClient(link);
