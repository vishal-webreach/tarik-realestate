// ============================================================
// PROPERTIES DATA
// Replace with PHP/MySQL API data in future backend integration
// ============================================================

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
  image: string;
  imageAlt: string;
  slug: string;
  featured: boolean;
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
    image: "https://images.pexels.com/photos/7028105/pexels-photo-7028105.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    imageAlt: "Front exterior view of 3501 Groveton St, Alexandria VA",
    slug: "3501-groveton-st-alexandria-va-22306",
    featured: true,
  },
  {
    id: "2",
    title: "Sample Property — Mount Vernon Ave",
    status: "For Sale",
    price: 749000,
    priceDisplay: "$749,000",
    address: "Sample Address — Mount Vernon Ave",
    city: "Alexandria",
    state: "VA",
    zip: "22301",
    fullAddress: "Sample Address, Alexandria, VA 22301",
    bedrooms: 4,
    bathrooms: 2,
    sqft: 2240,
    sqftDisplay: "2,240",
    image: "https://images.pexels.com/photos/35689825/pexels-photo-35689825.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    imageAlt: "Colonial brick home exterior",
    slug: "sample-mount-vernon-ave-alexandria-va",
    featured: true,
  },
  {
    id: "3",
    title: "Sample Property — North Fairfax",
    status: "For Sale",
    price: 625000,
    priceDisplay: "$625,000",
    address: "Sample Address — North Fairfax St",
    city: "Arlington",
    state: "VA",
    zip: "22203",
    fullAddress: "Sample Address, Arlington, VA 22203",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1850,
    sqftDisplay: "1,850",
    image: "https://images.pexels.com/photos/14672028/pexels-photo-14672028.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    imageAlt: "Suburban home exterior under clear blue sky",
    slug: "sample-north-fairfax-arlington-va",
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
    image: "https://images.pexels.com/photos/8082322/pexels-photo-8082322.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
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
    image: "https://images.pexels.com/photos/8143683/pexels-photo-8143683.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
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
    image: "https://images.pexels.com/photos/15048771/pexels-photo-15048771.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    imageAlt: "Sold suburban home exterior",
    slug: "sample-sold-braddock-rd-alexandria",
    featured: false,
  },
];
