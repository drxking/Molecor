import BlogPostClient from "./blog-post-client";

// This is a server component that will generate metadata
export async function generateMetadata({ params }) {
  const { slug } = params;
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${baseUrl}/api/blog/get/${slug}`, {
      next: { revalidate: 3600 }, 
    });

    if (!response.ok) {
      return {
        title: "Blog Post | Rewatek",
        description: "Read our latest blog posts on Rewatek",
      };
    }

    const post = await response.json();

    const excerpt = post.description
      ? post.description
          .replace(/<[^>]*>/g, "") // Remove HTML tags
          .substring(0, 160) // Limit to 160 characters
          .trim() + (post.description.length > 160 ? "..." : "")
      : "Read our latest blog posts on Rewatek";

    return {
      title: `${post.title} | Rewatek Blog`,
      description: excerpt,
      openGraph: {
        title: post.title,
        description: excerpt,
        type: "article",
        publishedTime: post.date,
        authors: ["Rewatek"],
        images: [
          {
            url: post.image || "https://rewatek.com/og-default.jpg",
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        siteName: "Rewatek",
        locale: "en_US",
        url: `https://rewatek.com/blog/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: excerpt,
        images: [post.image || "https://rewatek.com/og-default.jpg"],
        creator: "@Rewatek",
      },
      alternates: {
        canonical: `https://rewatek.com/blog/${slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post | Rewatek",
      description: "Read our latest blog posts on Rewatek",
    };
  }
}

export default function BlogPostPage({ params }) {
  return <BlogPostClient slug={params.slug} />;
}
