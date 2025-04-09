"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Globe, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export function NewsWidget() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=wildfire%20OR%20heatwave%20OR%20storm%20OR%20snowstorm&lang=en&token=16dfcc796b72a39497e69a93490b8bd8`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await response.json();
      console.log("API Response:", data); // Debug log
      
      // Process articles to ensure they have images
      const processedArticles = data.articles.map((article: any) => {
        console.log("Article:", article); // Debug log
        return {
          ...article,
          image: article.image || article.urlToImage || "/placeholder-news.jpg"
        };
      });
      setArticles(processedArticles.slice(0, 6));
      setError(null);
    } catch (err) {
      setError("No recent weather news found.");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 15 * 60 * 1000); // Refresh every 15 minutes
    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const nextArticles = () => {
    setCurrentIndex((prev) => (prev + 3) % articles.length);
  };

  const prevArticles = () => {
    setCurrentIndex((prev) => (prev - 3 + articles.length) % articles.length);
  };

  const currentArticles = articles.slice(currentIndex, currentIndex + 3);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
            Latest Weather News
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-black/20 rounded-lg p-4 animate-pulse">
              <div className="h-40 bg-white/10 rounded-lg mb-4" />
              <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
              <div className="h-4 bg-white/10 rounded w-1/2" />
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
            Latest Weather News
          </h2>
        </div>
        <p className="text-white/70 text-center py-8">{error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
            Latest Weather News
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prevArticles}
            className="p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors"
            disabled={articles.length <= 3}
          >
            <ChevronLeft className="h-5 w-5 text-white/60" />
          </button>
          <button
            onClick={nextArticles}
            className="p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors"
            disabled={articles.length <= 3}
          >
            <ChevronRight className="h-5 w-5 text-white/60" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {currentArticles.map((article, index) => (
          <motion.div
            key={article.url}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/20 rounded-lg overflow-hidden border border-white/10 hover:border-orange-400/50 transition-colors"
          >
            <div className="relative h-48">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-news.jpg";
                }}
                priority={index === 0}
                unoptimized
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2 line-clamp-2">{article.title}</h3>
              <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
                <Clock className="h-4 w-4" />
                <span>{formatTimeAgo(article.publishedAt)}</span>
                <span className="mx-2">•</span>
                <span>{article.source.name}</span>
              </div>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors text-sm"
              >
                Read More <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 