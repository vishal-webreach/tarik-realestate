// ============================================================
// SERVICE AREAS DATA
// Configurable — update area list as service area expands
// ============================================================

import alexandriaWaterfront from "../assets/photos/alexandriaWaterfront.jpg";
import northernVirginia from "../assets/photos/suburbanNeighborhood.jpg";
import fairfaxCounty from "../assets/photos/suburbanHome.jpg";
import arlington from "../assets/photos/brickTownhome.jpg";
import dcMetro from "../assets/areas/dcMetro.jpg";

export interface Area {
  id: string;
  name: string;
  description: string;
  image: ImageMetadata;
  imageAlt: string;
  slug: string;
}

export const serviceAreas: Area[] = [
  {
    id: "alexandria",
    name: "Alexandria",
    description: "Historic Old Town, Del Ray, and vibrant neighborhoods along the Potomac.",
    image: alexandriaWaterfront,
    imageAlt: "Alexandria Virginia waterfront",
    slug: "alexandria-va",
  },
  {
    id: "northern-virginia",
    name: "Northern Virginia",
    description: "Thriving communities across Fairfax, Arlington, and beyond.",
    image: northernVirginia,
    imageAlt: "Northern Virginia residential neighborhood",
    slug: "northern-virginia",
  },
  {
    id: "fairfax-county",
    name: "Fairfax County",
    description: "Top-rated schools, established neighborhoods, and strong market values.",
    image: fairfaxCounty,
    imageAlt: "Fairfax County suburban homes",
    slug: "fairfax-county-va",
  },
  {
    id: "arlington",
    name: "Arlington",
    description: "Urban amenities, walkable communities, and proximity to Washington DC.",
    image: arlington,
    imageAlt: "Arlington Virginia townhomes",
    slug: "arlington-va",
  },
  {
    id: "dc-metro",
    name: "Washington DC Metro",
    description: "Access to world-class culture, employment, and transit connections.",
    image: dcMetro,
    imageAlt: "Washington DC metropolitan area",
    slug: "washington-dc-metro",
  },
];
