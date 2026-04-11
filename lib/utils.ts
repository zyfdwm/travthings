export function optimizeImageUrl(url: string | undefined): string {
    if (!url) return "";

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dgz4njcvb";

    // If it's already an optimized Cloudinary URL, don't double encode it
    if (url.includes("res.cloudinary.com") && url.includes("f_auto")) {
        return url;
    }

    // If it is a native Cloudinary URL but missing f_auto, inject it into the path
    if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
        return url.replace("/upload/", "/upload/f_auto,q_auto/");
    }

    // For any other external image (Unsplash, Notion AWS generated links, etc)
    // Run it through Cloudinary Fetch API to aggressively optimize to AVIF/WebP
    return `https://res.cloudinary.com/${cloudName}/image/fetch/f_auto,q_auto/${encodeURIComponent(url)}`;
}
