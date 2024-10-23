import type { ImageObject, ImageType } from '../types';

export const createImageUrls = (basePath: ImageType, maxImages: number, skipNumbers: number[] = []): ImageObject[] => {
  const imageUrls: ImageObject[] = [];

  for (let i = 1; i <= maxImages; i++) {
    if (skipNumbers.includes(i)) continue;

    const paddedNumber = i.toString().padStart(2, '00');
    const url = `stonecolddown/${basePath}/${basePath.toLowerCase()}_${paddedNumber}`;

    imageUrls.push({
      id: `${basePath.toLowerCase()}_${paddedNumber}`,
      url,
    });
  }
  return imageUrls;
};
