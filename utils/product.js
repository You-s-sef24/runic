export function isValidImageSrc(src) {
    if (!src || typeof src !== "string") return false;
    return src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://");
}

export function getProductImages(product) {
    const images = Array.isArray(product?.images)
        ? product.images.filter(isValidImageSrc)
        : [];
    return images.length > 0 ? images : ["/placeholder.png"];
}