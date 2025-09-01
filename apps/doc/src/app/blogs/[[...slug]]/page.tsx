import { blogs } from '@/.source';
import { getMDXComponents } from '@/mdx-components';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function BlogPage(props: PageProps) {
  const params = await props.params;

  // If no slug, show blog index
  if (!params.slug || params.slug.length === 0) {
    const allBlogs = blogs.docs;

    return (
      <DocsPage>
        <DocsTitle>Blog</DocsTitle>
        <DocsBody>
          <div className="grid gap-6">
            {allBlogs.map((blog, index) => {
              const slug = blog._file.path.replace('.mdx', '');
              return (
                <article
                  key={blog._file.path}
                  className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <Link href={`/blogs/${slug}`} className="block">
                    <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">
                      {blog.title}
                    </h2>
                    {blog.description && (
                      <p className="text-gray-600 mb-3">{blog.description}</p>
                    )}
                    <span className="text-sm text-blue-600 hover:underline">
                      Read more →
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>
        </DocsBody>
      </DocsPage>
    );
  }

  // Find the blog by slug
  const slug = params.slug.join('/');
  const blog = blogs.docs.find(
    (doc) => doc._file.path.replace('.mdx', '') === slug
  );

  if (!blog) notFound();

  const MDXContent = blog.body;

  return (
    <DocsPage full={blog.full} toc={blog.toc}>
      <DocsTitle>{blog.title}</DocsTitle>
      <DocsDescription>{blog.description}</DocsDescription>
      <DocsBody>
        <MDXContent components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return blogs.docs.map((blog) => ({
    slug: [blog._file.path.replace('.mdx', '')],
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;

  // Handle blog index page
  if (!params.slug || params.slug.length === 0) {
    return {
      title: 'Blog',
      description: 'Read our latest blog posts',
    };
  }

  const slug = params.slug.join('/');
  const blog = blogs.docs.find(
    (doc) => doc._file.path.replace('.mdx', '') === slug
  );

  if (!blog) notFound();

  return {
    title: blog.title,
    description: blog.description,
  };
}