// ============================================================
// INSIGHTS / ARTICLES DATA
// Structure ready for CMS/PHP backend integration
// ============================================================

import livingRoom from "../assets/photos/livingRoom.jpg";
import stagedKitchen from "../assets/insights/stagedKitchen.jpg";
import alexandriaWaterfront from "../assets/photos/alexandriaWaterfront.jpg";

export interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  content: string[];
  image: ImageMetadata;
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
    content: [
      "Buying a home in Alexandria means weighing historic charm against modern convenience — from Old Town's walkable streets to the newer developments closer to the Beltway. Before you start touring, it helps to have a clear sense of what matters most: commute, school zone, walkability, or long-term resale value.",
      "Getting pre-approved early is one of the most useful steps a buyer can take. In a competitive market, sellers want confidence that an offer will close, and a pre-approval letter signals exactly that. It also gives you a realistic budget before you fall in love with a home outside your range.",
      "When it comes to making an offer, price is only one part of the equation. Contingencies, closing timeline, and flexibility on move-in dates can all make an offer more attractive to a seller — sometimes even more than a slightly higher price.",
      "Finally, don't skip the inspection, even in a fast-moving market. A good inspector can flag issues that aren't obvious on a walkthrough, giving you room to negotiate repairs or simply go in with your eyes open about what you're buying.",
      "Working with an agent who knows the local market can make the difference between chasing listings and finding the right one. Local knowledge — which blocks are quiet, which streets flood, which HOAs are well-run — isn't something you can always find online.",
    ],
    image: livingRoom,
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
    content: [
      "The first few seconds of a showing — or the first photo a buyer sees online — often shape their impression of the entire home. That's why preparation matters just as much as pricing when it comes to selling well.",
      "Start with decluttering and depersonalizing. Buyers need to be able to picture themselves in the space, which is harder to do when it's filled with personal photos, collections, or excess furniture. A lighter, more neutral space tends to photograph better and feel larger in person.",
      "Small repairs go a long way. A dripping faucet, a scuffed wall, or a squeaky door might seem minor, but they can quietly signal deferred maintenance to a buyer who's already looking for reasons to negotiate down.",
      "Staging doesn't have to mean a full furniture overhaul. Sometimes it's as simple as rearranging what you have, adding warmer lighting, or giving each room a clear purpose so buyers immediately understand how the space works.",
      "Lastly, timing and pricing strategy should work together with your preparation. A well-presented home priced correctly from day one tends to attract stronger, faster offers than one that sits on the market while buyers wonder why.",
    ],
    image: stagedKitchen,
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
    content: [
      "Alexandria offers a mix of neighborhoods that can feel like entirely different cities depending on where you land — from the cobblestone streets of Old Town to the more residential, family-friendly pockets further west.",
      "Proximity to Washington, D.C. continues to be a major draw, particularly for buyers who want walkable access to the waterfront, restaurants, and transit without the density of living directly in the city.",
      "Inventory and demand can shift block by block here more than in many suburban markets. A street with strong walkability or a well-regarded elementary school can command noticeably different interest than one just a few blocks away.",
      "For buyers, this means it pays to look beyond the headline numbers and understand a neighborhood's specific character — its zoning, its long-term development plans, and how it's trending year over year.",
      "For sellers, it means positioning a property within the story of its neighborhood, not just its square footage. Buyers in Alexandria are often choosing a lifestyle as much as a house, and marketing that connects the two tends to perform best.",
    ],
    image: alexandriaWaterfront,
    imageAlt: "Alexandria Virginia waterfront view",
    slug: "exploring-alexandria-real-estate-market",
    publishedAt: "2025-12-20",
  },
];
