export const getBase64 = (file: File) => {
    return new Promise((resolve, reject): void => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

export const isImage = (type: string): boolean => {
    const isJPG = type === 'image/jpeg';
    const isPNG = type === 'image/png';
    const isBMP = type === 'image/bmp';
    const isGIF = type === 'image/gif';
    const isWebp = type === 'image/webp';
    const isPic = isJPG || isPNG || isBMP || isGIF || isWebp;
    return isPic;
};

export const isApk = (type: string): boolean => {
    const isJPG = type === 'image/jpeg';
    const isPNG = type === 'image/png';
    const isBMP = type === 'image/bmp';
    const isGIF = type === 'image/gif';
    const isWebp = type === 'image/webp';
    const isPic = isJPG || isPNG || isBMP || isGIF || isWebp;
    return isPic;
};