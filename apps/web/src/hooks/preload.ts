import { useEffect, useState } from "react";

export const useImagePreloader = (images: string[]) => {
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false);

  const preloadImage = (image: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(img)
      }
      img.onerror = img.onabort = () => {
        reject(image)
      }
      img.src = image;
    })
  };

  useEffect(() => {
    const preload = async () => {
      const promises: Promise<string>[] = [];
      for (const image of images) {
        preloadImage(image)
      }
      await Promise.all(promises);
    }
    preload();
    setImagesPreloaded(true);
  }, []) 
  return { imagesPreloaded };
};