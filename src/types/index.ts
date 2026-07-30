export type Theme = 'dark' | 'light';

export interface Book {
  id: string;
  title: string;
  titleArabic: string;
  author: string;
  authorArabic: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  coverImage: string;
  insideImages: [string, string];
  description: string;
  longDescription: string;
  tableOfContents?: string[];
  publicationYear: number;
  pages: number;
  binding: string;
  language: string;
  isbn: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isOffer?: boolean;
  discountPercent?: number;
}

export interface SpecialOffer {
  id: string;
  title: string;
  titleArabic: string;
  subtitle: string;
  description: string;
  discountBadge: string;
  code?: string;
  bundleBooks: Book[];
  originalPrice: number;
  offerPrice: number;
  expiresIn?: string;
  image: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  notes: string;
}
