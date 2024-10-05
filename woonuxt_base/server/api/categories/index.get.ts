import type { ProductCategory } from '~~/types';

export default defineEventHandler(async (): Promise<ProductCategory[]> => {
  return [
    {
      node: {
        path: 'category',
        slug: 'fine-line',
        name: 'Fine Line',
        image: {
          sourceUrl: 'https://via.placeholder.com/300x200.png?text=Fine+Line+Tattoo',
          altText: 'Fine Line Tattoo Example',
          title: 'Fine Line Tattoo',
        },
      },
      imageLoading: 'lazy',
    },
    {
      node: {
        path: 'category',
        slug: 'dotwork',
        name: 'Dotwork',
        image: {
          sourceUrl: 'https://res.cloudinary.com/dks0sw9qh/image/upload/v1722137881/stonecolddown/Portfolio/portfolio_10.jpg',
          altText: 'Dotwork Tattoo Example',
          title: 'Dotwork Tattoo',
        },
      },
      imageLoading: 'lazy',
    },
    {
      node: {
        path: 'category',
        slug: 'blackwork',
        name: 'Blackwork',
        image: {
          sourceUrl: 'https://via.placeholder.com/300x200.png?text=Blackwork+Tattoo',
          altText: 'Blackwork Tattoo Example',
          title: 'Blackwork Tattoo',
        },
      },
      imageLoading: 'lazy',
    },
    {
      node: {
        path: 'category',
        slug: 'script',
        name: 'Script',
        image: {
          sourceUrl: 'https://via.placeholder.com/300x200.png?text=Script+Tattoo',
          altText: 'Script Tattoo Example',
          title: 'Script Tattoo',
        },
      },
      imageLoading: 'lazy',
    },
    {
      node: {
        path: 'category',
        slug: 'minimalist',
        name: 'Minimalist',
        image: {
          sourceUrl: 'https://via.placeholder.com/300x200.png?text=Minimalist+Tattoo',
          altText: 'Minimalist Tattoo Example',
          title: 'Minimalist Tattoo',
        },
      },
      imageLoading: 'lazy',
    },
    {
      node: {
        path: 'category',
        slug: 'geometric',
        name: 'Geometric',
        image: {
          sourceUrl: 'https://via.placeholder.com/300x200.png?text=Geometric+Tattoo',
          altText: 'Geometric Tattoo Example',
          title: 'Geometric Tattoo',
        },
      },
      imageLoading: 'lazy',
    },
  ];
});
