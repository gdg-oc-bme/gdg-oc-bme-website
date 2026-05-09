import { fetchApi } from "@/lib/api";
import ArticleCard from "@/components/ArticleCard";

interface Article {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  createdAt: string;
}

export default async function BlogPage() {
  let articles: Article[] = [];
  try {
    articles = await fetchApi<Article[]>("/articles");
  } catch {}

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="mb-12">
        <span className="text-google-red text-sm font-semibold uppercase tracking-wider">Community Stories</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-google-dark mt-2">
          Blog
        </h1>
        <p className="mt-3 text-google-gray max-w-lg">
          News, updates, and stories from our community.
        </p>
      </div>
      {articles.length === 0 ? (
        <div className="text-center py-20 text-google-gray">
          <p className="text-lg">No articles yet. Stay tuned!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      )}
    </div>
  );
}
