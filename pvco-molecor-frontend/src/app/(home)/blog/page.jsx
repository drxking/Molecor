"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarIcon, ArrowRight } from "lucide-react";
import Skeleton from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';



export default function BlogClient() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
 
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/api/blog?page=${currentPage}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);
        setNewsArticles(data.blogs);
        setTotalPages(data.meta.totalPages);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white  to-primary/50">
      <main className="container max-w-7xl mx-auto px-4 py-8 flex-grow">
        <div className="text-center mb-16">
          <h2 className="text-primary/80 text-2xl sm:text-3xl md:text-5xl lg:text-6xl solway-text font-bold mb-4">
            Our Blog
          </h2>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-primary/10 bg-white shadow-md"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <Skeleton className="h-full w-full bg-primary/10" />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-center mb-3">
                    <Skeleton className="h-4 w-4 mr-2 rounded-full bg-primary/10" />
                    <Skeleton className="h-4 w-32 bg-primary/10" />
                  </div>
                  <Skeleton className="h-6 w-3/4 mb-3 bg-primary/10" />
                  <Skeleton className="h-4 w-full mb-4 bg-primary/10" />
                  <Skeleton className="h-4 w-1/3 mt-4 bg-primary/10" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {newsArticles.map((article, index) => (
              <article
                key={article.id}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-primary/20 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <Image
                    src={
                      article.image || "/placeholder.svg?height=400&width=600"
                    }
                    alt={article.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="flex-1 p-6">
                  <div className="flex items-center text-sm  mb-3 text-black lato-text ">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>

                  <h3 className="mb-3 text-xl font-bold tracking-tight text-primary/80 group-hover:text-primary/80transition-colors line-clamp-2 playfair-text">
                    {article.title}
                  </h3>
                </div>

                <Link
                  href={`/blog/${article.slug}`}
                  className="absolute inset-0"
                  aria-label={`Read more about ${article.title}`}
                >
                  <span className="sr-only">
                    Read more about {article.title}
                  </span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center py-8">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          className="mr-2 border-navy-400 text-navy-700 hover:bg-navy-100 hover:text-navy-700 disabled:text-navy-200"
        >
          Previous
        </Button>
        <span className="mx-4 text-lg font-medium text-navy-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          className="ml-2 border-navy-400 text-navy-700 hover:bg-navy-100 hover:text-navy-700 disabled:text-navy-200"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
