import { QueryCache, QueryClient } from '@tanstack/react-query';
import { createTRPCClient, createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { toast } from 'sonner';
import type { trpcAppRouter } from '../../../server/src/routers';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(error.message, {
        action: {
          label: 'retry',
          onClick: () => {
            queryClient.invalidateQueries();
          },
        },
      });
    },
  }),
});

const trpcClient = createTRPCClient<trpcAppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/trpc`,
      fetch(url, options) {
        return fetch(url, { ...options, credentials: 'include' });
      },
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<trpcAppRouter>({
  client: trpcClient,
  queryClient,
});

export const trpcRPoxyClient = createTRPCProxyClient<trpcAppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/trpc`,
      fetch(url, options) {
        return globalThis.fetch(url, { ...options }); // bypass Next’s RSC fetch
      },
    }),
  ],
});
