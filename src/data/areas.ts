// ============================================================
// SERVICE AREAS DATA
// Configurable — update area list as service area expands
// ============================================================

import alexandriaWaterfront from "../assets/photos/alexandriaWaterfront.jpg";
import suburbanNeighborhood from "../assets/photos/suburbanNeighborhood.jpg";
import suburbanHome from "../assets/photos/suburbanHome.jpg";
import brickTownhome from "../assets/photos/brickTownhome.jpg";
import brickMansion from "../assets/photos/brickMansion.jpg";
import livingRoom from "../assets/photos/livingRoom.jpg";
import kingSt from "../assets/properties/kingSt.jpg";
import mountVernon from "../assets/properties/mountVernon.jpg";
import sellerCta from "../assets/buy-sell/sellerCta.jpg";
import winchesterLandmark from "../assets/areas/dcMetro.jpg";

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
    id: "arlington",
    name: "Arlington",
    description: "Urban amenities, walkable communities, and proximity to Washington DC.",
    image: brickTownhome,
    imageAlt: "Townhomes representative of Arlington, Virginia",
    slug: "arlington-va",
  },
  {
    id: "clarke",
    name: "Clarke County",
    description: "Rural Blue Ridge foothills with small-town charm around Berryville.",
    image: suburbanNeighborhood,
    imageAlt: "Residential neighborhood representative of Clarke County, Virginia",
    slug: "clarke-county-va",
  },
  {
    id: "culpeper",
    name: "Culpeper",
    description: "A historic downtown paired with growing Piedmont-area communities.",
    image: brickMansion,
    imageAlt: "Historic home representative of Culpeper, Virginia",
    slug: "culpeper-va",
  },
  {
    id: "fairfax-county",
    name: "Fairfax County",
    description: "Top-rated schools, established neighborhoods, and strong market values.",
    image: suburbanHome,
    imageAlt: "Fairfax County suburban homes",
    slug: "fairfax-county-va",
  },
  {
    id: "fairfax-city",
    name: "Fairfax City",
    description: "A walkable independent city with a strong sense of community.",
    image: sellerCta,
    imageAlt: "Home representative of Fairfax City, Virginia",
    slug: "fairfax-city-va",
  },
  {
    id: "falls-church",
    name: "Falls Church",
    description: "A compact, highly rated independent city just inside the Beltway.",
    image: livingRoom,
    imageAlt: "Interior representative of a Falls Church, Virginia home",
    slug: "falls-church-va",
  },
  {
    id: "fauquier",
    name: "Fauquier County",
    description: "Rolling countryside, horse farms, and historic Warrenton.",
    image: mountVernon,
    imageAlt: "Home representative of Fauquier County, Virginia",
    slug: "fauquier-county-va",
  },
  {
    id: "frederick",
    name: "Frederick County",
    description: "Scenic Shenandoah Valley living just outside Winchester.",
    image: kingSt,
    imageAlt: "Home representative of Frederick County, Virginia",
    slug: "frederick-county-va",
  },
  {
    id: "fredericksburg",
    name: "Fredericksburg",
    description: "A historic riverfront city with convenient commuter rail access.",
    image: suburbanNeighborhood,
    imageAlt: "Residential neighborhood representative of Fredericksburg, Virginia",
    slug: "fredericksburg-va",
  },
  {
    id: "loudoun",
    name: "Loudoun County",
    description: "Fast-growing communities, wineries, and top-tier schools.",
    image: brickMansion,
    imageAlt: "Home representative of Loudoun County, Virginia",
    slug: "loudoun-county-va",
  },
  {
    id: "manassas",
    name: "Manassas",
    description: "Historic battlefields alongside family-friendly neighborhoods.",
    image: sellerCta,
    imageAlt: "Home representative of Manassas, Virginia",
    slug: "manassas-va",
  },
  {
    id: "manassas-park",
    name: "Manassas Park",
    description: "A small, tight-knit community with easy commuter access.",
    image: livingRoom,
    imageAlt: "Interior representative of a Manassas Park, Virginia home",
    slug: "manassas-park-va",
  },
  {
    id: "orange",
    name: "Orange County",
    description: "Rural charm and history in the heart of the Piedmont.",
    image: mountVernon,
    imageAlt: "Home representative of Orange County, Virginia",
    slug: "orange-county-va",
  },
  {
    id: "prince-william",
    name: "Prince William County",
    description: "Diverse, affordable communities with strong commuter access.",
    image: kingSt,
    imageAlt: "Home representative of Prince William County, Virginia",
    slug: "prince-william-county-va",
  },
  {
    id: "rappahannock",
    name: "Rappahannock County",
    description: "Quiet, scenic Blue Ridge foothills and working farms.",
    image: suburbanHome,
    imageAlt: "Residential scene representative of Rappahannock County, Virginia",
    slug: "rappahannock-county-va",
  },
  {
    id: "spotsylvania",
    name: "Spotsylvania County",
    description: "Historic sites and growing residential communities near Fredericksburg.",
    image: brickTownhome,
    imageAlt: "Home representative of Spotsylvania County, Virginia",
    slug: "spotsylvania-county-va",
  },
  {
    id: "stafford",
    name: "Stafford County",
    description: "Riverside communities with convenient I-95 commuter access.",
    image: alexandriaWaterfront,
    imageAlt: "Waterfront scene representative of Stafford County, Virginia",
    slug: "stafford-county-va",
  },
  {
    id: "warren",
    name: "Warren County",
    description: "Gateway to the Shenandoah Valley around Front Royal.",
    image: suburbanNeighborhood,
    imageAlt: "Residential neighborhood representative of Warren County, Virginia",
    slug: "warren-county-va",
  },
  {
    id: "winchester",
    name: "Winchester",
    description: "Historic apple country at the northern gateway to the Shenandoah Valley.",
    image: winchesterLandmark,
    imageAlt: "Historic Handley Library in Winchester, Virginia",
    slug: "winchester-va",
  },
];
