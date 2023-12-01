// route to extract og card image from an article URL

import { parse } from "node-html-parser";
// import fetch from 'ofetch';

export default defineEventHandler(async (event) => {
  try {
    const { url } = getQuery(event);
    console.log("articleUrl", url);
    if (!url) {
      event.node.res.statusCode = 400;
      return "Article URL is required";
    }

    // Fetch the article HTML
    const response = await fetch(url as any);
    const html = await response.text();
    const root = parse(html);
    const metaTag = root.querySelector('meta[property="og:image"]');
    if (!metaTag || !metaTag.getAttribute("content")) {
      event.node.res.statusCode = 404;
      return "Image URL not found";
    }

    // Fetch the image from the extracted URL
    const imageUrl = metaTag.getAttribute("content");
    const imageResponse = await fetch(imageUrl as any);
    if (!imageResponse.ok) {
      event.node.res.statusCode = 404;
      return "Image not found";
    }

    // Set the content type to the image's content type
    event.node.res.setHeader(
      "Content-Type",
      imageResponse.headers.get("content-type") || "application/octet-stream"
    );

    // Stream the image back as a response
    return imageResponse.body;
  } catch (error) {
    console.error("Error:", error);
    event.node.res.statusCode = 500;
    return "Server error";
  }
});
