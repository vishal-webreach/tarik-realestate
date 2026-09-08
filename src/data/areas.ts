// ============================================================
// SERVICE AREAS DATA
// Configurable — update area list as service area expands
// ============================================================

export interface Area {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  slug: string;
}

export const serviceAreas: Area[] = [
  {
    id: "alexandria",
    name: "Alexandria",
    description: "Historic Old Town, Del Ray, and vibrant neighborhoods along the Potomac.",
    image: "https://images.pexels.com/photos/37594918/pexels-photo-37594918.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
    imageAlt: "Alexandria Virginia waterfront",
    slug: "alexandria-va",
  },
  {
    id: "northern-virginia",
    name: "Northern Virginia",
    description: "Thriving communities across Fairfax, Arlington, and beyond.",
    image: "https://images.pexels.com/photos/15048771/pexels-photo-15048771.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
    imageAlt: "Northern Virginia residential neighborhood",
    slug: "northern-virginia",
  },
  {
    id: "fairfax-county",
    name: "Fairfax County",
    description: "Top-rated schools, established neighborhoods, and strong market values.",
    image: "https://images.pexels.com/photos/14672028/pexels-photo-14672028.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
    imageAlt: "Fairfax County suburban homes",
    slug: "fairfax-county-va",
  },
  {
    id: "arlington",
    name: "Arlington",
    description: "Urban amenities, walkable communities, and proximity to Washington DC.",
    image: "https://images.pexels.com/photos/7028105/pexels-photo-7028105.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
    imageAlt: "Arlington Virginia townhomes",
    slug: "arlington-va",
  },
  {
    id: "dc-metro",
    name: "Washington DC Metro",
    description: "Access to world-class culture, employment, and transit connections.",
    image: "https://images.pexels.com/photos/36467327/pexels-photo-36467327.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
    imageAlt: "Washington DC metropolitan area",
    slug: "washington-dc-metro",
  },
];
