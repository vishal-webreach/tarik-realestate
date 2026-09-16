// ============================================================
// PROPERTIES DATA
// Replace with PHP/MySQL API data in future backend integration
// ============================================================

import mountVernon from "../assets/properties/mountVernon.jpg";
import northFairfax from "../assets/photos/suburbanHome.jpg";
import kingSt from "../assets/properties/kingSt.jpg";
import seminaryRd from "../assets/photos/brickMansion.jpg";
import braddockRd from "../assets/photos/suburbanNeighborhood.jpg";

// Full photo set for 3501 Groveton St, sorted numerically by the trailing
// "-N.jpg" suffix (a plain string sort would order …-1, -10, -11 … -2, -20…).
const grovetonGalleryModules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/properties/3501-groveton-st-alexandria-va-22306/*.jpg",
  { eager: true }
);
const grovetonGallery = Object.entries(grovetonGalleryModules)
  .sort(([a], [b]) => {
    const numA = Number(a.match(/-(\d+)\.jpg$/)?.[1] ?? 0);
    const numB = Number(b.match(/-(\d+)\.jpg$/)?.[1] ?? 0);
    return numA - numB;
  })
  .map(([, mod]) => mod.default);

export interface PropertyFact {
  label: string;
  value: string;
}

export interface PropertyFactSection {
  heading: string;
  facts: PropertyFact[];
}

export interface PropertyDetails {
  gallery: ImageMetadata[];
  homeType: string;
  architecturalStyle: string;
  yearBuilt: number;
  majorRemodelYear?: number;
  lotSize: string;
  pricePerSqft: string;
  hoaFee: string;
  whatsSpecial: string[];
  description: string;
  factSections: PropertyFactSection[];
  listedBy: string;
}

export interface Property {
  id: string;
  title: string;
  status: "For Sale" | "Pending" | "Sold";
  price: number;
  priceDisplay: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  fullAddress: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  sqftDisplay: string;
  image: ImageMetadata;
  imageAlt: string;
  slug: string;
  featured: boolean;
  details?: PropertyDetails;
}

// Featured active listings
export const featuredProperties: Property[] = [
  {
    id: "1",
    title: "3501 Groveton St",
    status: "For Sale",
    price: 599000,
    priceDisplay: "$599,000",
    address: "3501 Groveton St",
    city: "Alexandria",
    state: "VA",
    zip: "22306",
    fullAddress: "3501 Groveton St, Alexandria, VA 22306",
    bedrooms: 3,
    bathrooms: 1,
    sqft: 1578,
    sqftDisplay: "1,578",
    image: grovetonGallery[0],
    imageAlt: "Front exterior view of 3501 Groveton St, Alexandria VA",
    slug: "3501-groveton-st-alexandria-va-22306",
    featured: true,
    details: {
      gallery: grovetonGallery,
      homeType: "Single Family Residence",
      architecturalStyle: "Cape Cod",
      yearBuilt: 1946,
      majorRemodelYear: 2023,
      lotSize: "0.46 Acres",
      pricePerSqft: "$380/sqft",
      hoaFee: "None",
      whatsSpecial: [
        "Beautifully remodeled Cape Cod",
        "Ample off-street parking",
        "Luxury vinyl plank flooring",
        "Central HVAC",
        "Full basement",
      ],
      description:
        "Exceptional opportunity to own one of the most versatile properties in Fairfax County! Situated on a spacious nearly half-acre corner lot in the highly desirable Groveton community, this beautifully remodeled Cape Cod offers the perfect blend of residential comfort and business potential. Renovated in 2023, the home features 3 bedrooms, 1 full bathroom, approximately 1,578 square feet of living space, an updated kitchen with stainless steel appliances, luxury vinyl plank flooring, central HVAC, a full basement, and ample off-street parking. What truly makes this property unique is the existing Special Use Permit (SUP), which allows the operation of a daycare facility. This rare approval creates an incredible opportunity for a buyer looking to operate a licensed daycare from home, own an established owner-user business, or purchase a property with exceptional investment potential. The current layout has been configured for daycare use, but the home can easily be transitioned back into a traditional single-family residence, making it an ideal option for homeowners, investors, or entrepreneurs alike. Whether you're searching for a beautiful place to call home, a property where you can live and operate your own business, or an investment with multiple potential income opportunities, this home offers flexibility that is rarely available in today's market. The existing Special Use Permit adds significant value by providing options that very few residential properties can offer. Conveniently located just minutes from Old Town Alexandria, Fort Belvoir, Huntington Metro, the George Washington Parkway, and Washington, D.C., this home also offers easy access to Huntley Meadows Park, Historic Huntley, Mount Vernon District Park, shopping, restaurants, and major commuter routes. This is more than just a home—it's a rare opportunity to own a property with residential, business, and investment potential all in one.",
      factSections: [
        {
          heading: "Interior",
          facts: [
            { label: "Bedrooms", value: "3" },
            { label: "Bathrooms", value: "1 full" },
            { label: "Heating", value: "Central, Natural Gas" },
            { label: "Cooling", value: "Ceiling Fan(s), Central Air, Electric" },
            {
              label: "Appliances",
              value:
                "Microwave, Built-In Range, Disposal, Dishwasher, Dryer, Oven/Range - Electric, Refrigerator, Stainless Steel Appliance(s), Electric Water Heater",
            },
            { label: "Laundry", value: "In Basement" },
            { label: "Features", value: "Built-in Features, Kitchen Island, Soaking Tub, Ceiling Fan(s), Dry Wall" },
            { label: "Flooring", value: "Luxury Vinyl, Carpet" },
            { label: "Basement", value: "Full, Heated, Improved, Interior Entry" },
            { label: "Fireplace", value: "1 (Brick)" },
            { label: "Total interior livable area", value: "1,578 sqft" },
          ],
        },
        {
          heading: "Property",
          facts: [
            { label: "Parking", value: "4 spaces — Free, Paved, Driveway, Off Street" },
            { label: "Levels", value: "One and One Half" },
            { label: "Patio & porch", value: "Deck, Porch" },
            { label: "Exterior features", value: "Flood Lights, Rain Gutters, Play Area, Sidewalks, Storage, Street Lights" },
            { label: "Fencing", value: "Chain Link" },
            { label: "View", value: "Street, Trees/Woods" },
            { label: "Lot", value: "0.46 Acres, Corner Lot/Unit" },
            { label: "Zoning", value: "120" },
          ],
        },
        {
          heading: "Construction",
          facts: [
            { label: "Home type", value: "Single Family" },
            { label: "Architectural style", value: "Cape Cod" },
            { label: "Materials", value: "Vinyl Siding, Brick Front" },
            { label: "Foundation", value: "Brick/Mortar" },
            { label: "Roof", value: "Architectural Shingle" },
            { label: "Condition", value: "Good" },
            { label: "Year built", value: "1946 (remodeled 2023)" },
          ],
        },
        {
          heading: "Utilities",
          facts: [
            { label: "Sewer", value: "Public Sewer" },
            { label: "Water", value: "Public" },
            { label: "Electric", value: "120/240V" },
            { label: "Available", value: "Cable, Natural Gas, Phone, Water, Fiber Optic, Broadband" },
          ],
        },
        {
          heading: "Community & HOA",
          facts: [
            { label: "Subdivision", value: "Groveton" },
            { label: "HOA", value: "None" },
            { label: "Region", value: "Alexandria" },
          ],
        },
        {
          heading: "Financial & listing",
          facts: [
            { label: "Price per sqft", value: "$380/sqft" },
            { label: "Tax assessed value", value: "$601,070" },
            { label: "Annual tax amount", value: "$7,563" },
            { label: "Listing terms", value: "Cash, Conventional, FHA, VA Loan, FHLMC, Bank Portfolio" },
            { label: "Ownership", value: "Fee Simple" },
          ],
        },
      ],
      listedBy: "Tarik Jabrane",
    },
  },
  {
    id: "2",
    title: "Mount Vernon Ave",
    status: "Sold",
    price: 749000,
    priceDisplay: "$749,000",
    address: "Mount Vernon Ave",
    city: "Alexandria",
    state: "VA",
    zip: "22301",
    fullAddress: "Mount Vernon Ave, Alexandria, VA 22301",
    bedrooms: 4,
    bathrooms: 2,
    sqft: 2240,
    sqftDisplay: "2,240",
    image: mountVernon,
    imageAlt: "Colonial brick home exterior",
    slug: "mount-vernon-ave-alexandria-va",
    featured: true,
  },
  {
    id: "3",
    title: "North Fairfax St",
    status: "Sold",
    price: 625000,
    priceDisplay: "$625,000",
    address: "North Fairfax St",
    city: "Arlington",
    state: "VA",
    zip: "22203",
    fullAddress: "North Fairfax St, Arlington, VA 22203",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1850,
    sqftDisplay: "1,850",
    image: northFairfax,
    imageAlt: "Suburban home exterior under clear blue sky",
    slug: "north-fairfax-arlington-va",
    featured: true,
  },
];

// Recent sales — placeholder until actual sales data provided
export const recentSales: Property[] = [
  {
    id: "s1",
    title: "Sample Sold Property — King St",
    status: "Sold",
    price: 0,
    priceDisplay: "",
    address: "Sample Address — King St",
    city: "Alexandria",
    state: "VA",
    zip: "22314",
    fullAddress: "Sample Address, Alexandria, VA 22314",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1920,
    sqftDisplay: "1,920",
    image: kingSt,
    imageAlt: "Sold property exterior, Alexandria VA",
    slug: "sample-sold-king-st-alexandria",
    featured: false,
  },
  {
    id: "s2",
    title: "Sample Sold Property — Seminary Rd",
    status: "Sold",
    price: 0,
    priceDisplay: "",
    address: "Sample Address — Seminary Rd",
    city: "Alexandria",
    state: "VA",
    zip: "22304",
    fullAddress: "Sample Address, Alexandria, VA 22304",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2540,
    sqftDisplay: "2,540",
    image: seminaryRd,
    imageAlt: "Sold elegant brick home exterior",
    slug: "sample-sold-seminary-rd-alexandria",
    featured: false,
  },
  {
    id: "s3",
    title: "Sample Sold Property — Braddock Rd",
    status: "Sold",
    price: 0,
    priceDisplay: "",
    address: "Sample Address — Braddock Rd",
    city: "Alexandria",
    state: "VA",
    zip: "22302",
    fullAddress: "Sample Address, Alexandria, VA 22302",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1680,
    sqftDisplay: "1,680",
    image: braddockRd,
    imageAlt: "Sold suburban home exterior",
    slug: "sample-sold-braddock-rd-alexandria",
    featured: false,
  },
];
