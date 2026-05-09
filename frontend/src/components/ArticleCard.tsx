import Link from "next/link";

interface ArticleCardProps {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  createdAt: string;
}

export default function ArticleCard({
  id,
  title,
  content,
  imageUrl,
  author,
  createdAt,
}: ArticleCardProps) {
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${id}`}
      className="group bg-white rounded-2xl border border-google-border overflow-hidden hover:border-transparent hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
    >
      <div className="h-44 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-google-dark group-hover:text-google-blue transition-colors line-clamp-2 text-[15px]">
          {title}
        </h3>
        <p className="text-sm text-google-gray mt-2 line-clamp-2 leading-relaxed">
          {content}
        </p>
        <div className="flex items-center gap-2 mt-3 text-xs text-google-gray">
          <span className="font-medium text-google-dark">{author}</span>
          <span className="text-google-border">|</span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}
