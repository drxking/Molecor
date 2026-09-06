import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "kajunje Blog Post";
export const size = {
  width: 1200,
  height: 630,
};

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5503";

  try {
    // Fetch the blog post data
    const response = await fetch(`${baseUrl}/v1/blog/get/${slug}`);
    if (!response.ok) {
      throw new Error("Failed to fetch blog post");
    }

    const post = await response.json();

    // Create a plain text excerpt from the HTML content
    const excerpt = post.description
      ? post.description
          .replace(/<[^>]*>/g, "") // Remove HTML tags
          .substring(0, 100) // Limit to 100 characters for OG image
          .trim() + (post.description.length > 100 ? "..." : "")
      : "";

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            backgroundImage: post.image
              ? `url(${post.image})`
              : "linear-gradient(to bottom right, #4f46e5, #9333ea)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Semi-transparent overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "48px",
            }}
          >
            {/* Logo and branding */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  fontSize: 24,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                KhojaMandu Blog
              </div>
            </div>

            {/* Content */}
            <div style={{ maxWidth: "80%" }}>
              <div
                style={{
                  fontSize: 64,
                  fontWeight: "bold",
                  color: "white",
                  lineHeight: 1.1,
                  marginBottom: 16,
                }}
              >
                {post.title}
              </div>

              <div
                style={{
                  fontSize: 24,
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 1.4,
                  marginBottom: 24,
                }}
              >
                {excerpt}
              </div>

              <div
                style={{
                  fontSize: 18,
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                {new Date(post.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    // Fallback image if there's an error
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#4f46e5",
            color: "white",
            fontSize: 48,
            fontWeight: "bold",
            textAlign: "center",
            padding: 48,
          }}
        >
          KhojaMandu Blog
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
