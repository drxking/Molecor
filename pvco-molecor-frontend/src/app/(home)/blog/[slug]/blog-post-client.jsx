"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Share2, MessageSquare } from "lucide-react";
import { format } from "date-fns";
//import { Button } from "@/components/ui/button";
//import { Skeleton } from "@/components/ui/skeleton";
//import { Card } from "@/components/ui/card";

export default function BlogPostClient({ slug }) {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/blog/get/${slug}`, {
          
        });

        if (!response.ok) {
          throw new Error("Failed to fetch the blog post");
        }

        const data = await response.json();

        if (data) {
          setPost(data);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Error fetching the blog post:", error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 bg-primary/5">
        <Skeleton className="h-8 w-3/4 bg-primary/10" />
        <Skeleton className="h-64 w-full rounded-xl bg-primary/10" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32 bg-primary/10" />
          <Skeleton className="h-6 w-24 bg-primary/10" />
        </div>
        <Skeleton className="h-6 w-full bg-primary/10" />
        <Skeleton className="h-6 w-5/6 bg-primary/10" />
        <Skeleton className="h-6 w-3/4 bg-primary/10" />
      </div>
    );
  }

  if (!post) {
    return <p className="text-navy-700 text-center py-12">Post not found</p>;
  }

  return <BlogPost post={post} />;
}

function BlogPost({ post }) {
  return (
    <div className="bg-gradient-to-b from-white  to-primary/50">
      <article className="max-w-4xl mx-auto px-4 py-12 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4 text-primary/80 solway-text ">
            {post.title}
          </h1>

          <div className="relative aspect-[16/9] mb-8 rounded-xl overflow-hidden shadow-md">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between">
              <Link href="/blog">
                <Button
                  variant="ghost"
                  className="group mb-3 bg-primary text-white  hover:text-white hover:bg-primary/70 lora-text cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                  Back to Blogs
                </Button>
              </Link>
              <div className="flex items-center space-x-4 text-sm text-navy-400 lora-text">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(new Date(post.date), "MMMM dd, yyyy")}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 overflow-hidden border  shadow-md hover:shadow-lg transition-shadow bg-white rounded-xl">
            <div
              className="prose dark:prose-invert max-w-none text-justify space-y-3 text-navy-600 prose-headings:text-navy-700 prose-a:text-navy-600 prose-a:hover:text-navy-400 prose-strong:text-navy-700 prose-blockquote:border-navy-200 prose-blockquote:text-navy-600 prose-blockquote:bg-primary/5 prose-hr:border-navy-200"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
          </div>
        

          
        </motion.div>
      </article>
    </div>
  );
}
