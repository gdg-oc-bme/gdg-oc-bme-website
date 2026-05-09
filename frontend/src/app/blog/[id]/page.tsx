import { fetchApi } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Article {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  createdAt: string;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let article: Article | null = null;
  try {
    article = await fetchApi<Article>(`/articles/${id}`);
  } catch {}

  if (!article) notFound();

  const date = new Date(article.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-google-blue hover:text-google-blue/80 text-sm font-medium mb-8 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </Link>
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-64 sm:h-80 object-cover rounded-2xl mb-8"
      />
      <h1 className="text-3xl sm:text-4xl font-bold text-google-dark">{article.title}</h1>
      <div className="flex items-center gap-2 mt-4 text-sm text-google-gray">
        <span className="font-medium text-google-dark">{article.author}</span>
        <span>&middot;</span>
        <span>{date}</span>
      </div>
      <div className="mt-8 text-google-gray leading-relaxed whitespace-pre-line text-lg">
        {article.content}
      </div>
    </div>
  );
}
