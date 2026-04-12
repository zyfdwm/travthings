export function optimizeImageUrl(
    url: string | undefined, 
    width?: number, 
    height?: number, 
    quality: string = "auto"
): string {
    if (!url) return "";

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dgz4njcvb";

    // Prepare transformation string
    const transforms: string[] = [`f_auto`, `q_${quality}`];
    if (width) transforms.push(`w_${width}`);
    if (height) transforms.push(`h_${height}`);
    if (width || height) transforms.push(`c_fill`);
    
    const transformStr = transforms.join(",");

    // If it is a native Cloudinary URL (upload)
    if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
        const parts = url.split("/upload/");
        const afterUpload = parts[1].split("/");
        const finalPath = afterUpload[afterUpload.length - 1]; 
        const version = afterUpload.length > 1 ? afterUpload[afterUpload.length - 2] : "";
        return `${parts[0]}/upload/${transformStr}/${version ? version + "/" : ""}${finalPath}`;
    }

    // If it is already a Cloudinary Fetch URL, extract the inner URL and re-process it
    // This prevents double-wrapping (res.cloudinary.com/.../fetch/.../res.cloudinary.com/.../fetch/...)
    if (url.includes("res.cloudinary.com") && url.includes("/fetch/")) {
        const parts = url.split("/fetch/");
        const afterFetch = parts[1].split("/");
        // The last part of a fetch URL is the original URL (encoded or not)
        // Cloudinary fetch structure: .../fetch/<transforms>/<version>/<url>
        const originalUrl = decodeURIComponent(afterFetch[afterFetch.length - 1]);
        return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformStr}/${encodeURIComponent(originalUrl)}`;
    }

    // For any other external image (Unsplash, Notion AWS generated links, etc)
    let cleanUrl = url;
    if (url.includes("images.unsplash.com")) {
        cleanUrl = url.split("?")[0];
    }

    return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformStr}/${encodeURIComponent(cleanUrl)}`;
}
