// ============================================================
// INSIGHTS / ARTICLES DATA
// Structure ready for CMS/PHP backend integration
// ============================================================

export interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  slug: string;
  publishedAt: string;
}

export const articles: Article[] = [
  {
    id: "a1",
    category: "Buying",
    title: "What to Know Before Buying a Home in Alexandria",
    excerpt:
      "From navigating competitive offers to understanding local market trends — a practical guide for buyers in the Alexandria area.",
    image: "https://images.pexels.com/photos/8089172/pexels-photo-8089172.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    imageAlt: "Modern living room interior in Alexandria home",
    slug: "what-to-know-before-buying-home-alexandria",
    publishedAt: "2026-01-15",
  },
  {
    id: "a2",
    category: "Selling",
    title: "Preparing Your Home for the Market",
    excerpt:
      "First impressions matter. Learn how strategic preparation can position your property to attract qualified buyers quickly.",
    image: "https://images.pexels.com/photos/7031879/pexels-photo-7031879.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    imageAlt: "Beautifully staged kitchen interior",
    slug: "preparing-your-home-for-the-market",
    publishedAt: "2026-01-08",
  },
  {
    id: "a3",
    category: "Local",
    title: "Exploring the Alexandria Real Estate Market",
    excerpt:
      "A closer look at the neighborhoods, trends, and opportunities shaping the Alexandria, Virginia real estate landscape.",
    image: "https://images.pexels.com/photos/37594918/pexels-photo-37594918.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    imageAlt: "Alexandria Virginia waterfront view",
    slug: "exploring-alexandria-real-estate-market",
    publishedAt: "2025-12-20",
  },
];
