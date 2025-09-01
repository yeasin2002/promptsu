import { baseOptions } from '@/lib/layout.shared';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayout {...baseOptions()}>{children}</DocsLayout>;
}