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

    // If it is a native Cloudinary URL
    if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
        // Remove any existing transformations and inject new ones
        const parts = url.split("/upload/");
        const afterUpload = parts[1].split("/");
        
        // If there are existing comma-separated transforms, skip them
        const finalPath = afterUpload[afterUpload.length - 1]; 
        const version = afterUpload.length > 1 ? afterUpload[afterUpload.length - 2] : "";

        return `${parts[0]}/upload/${transformStr}/${version ? version + "/" : ""}${finalPath}`;
    }

    // For any other external image (Unsplash, Notion AWS generated links, etc)
    // Run it through Cloudinary Fetch API to aggressively optimize and resize
    // We remove some common query params from Unsplash to let Cloudinary handle it
    let cleanUrl = url;
    if (url.includes("images.unsplash.com")) {
        cleanUrl = url.split("?")[0];
    }

    return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformStr}/${encodeURIComponent(cleanUrl)}`;
}
