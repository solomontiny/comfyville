import listing1 from "@/assets/listing-1.jpg";
import listing2 from "@/assets/listing-2.jpg";
import listing3 from "@/assets/listing-3.jpg";
import listing4 from "@/assets/listing-4.jpg";
import listing5 from "@/assets/listing-5.jpg";
import listing6 from "@/assets/listing-6.jpg";

export interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: string;
  type: "apartment" | "villa" | "cabin" | "penthouse" | "studio";
  beds: number;
  baths: number;
  guests: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  whatsapp: string;
  available: boolean;
}

export const listings: Listing[] = [
  {
    id: "beachfront-villa-malibu",
    title: "Beachfront Villa with Infinity Pool",
    location: "Malibu, California",
    price: 450,
    currency: "USD",
    type: "villa",
    beds: 4,
    baths: 3,
    guests: 8,
    rating: 4.9,
    reviews: 127,
    image: listing1,
    images: [listing1, listing4, listing5],
    description: "Experience paradise in this stunning beachfront villa. Floor-to-ceiling windows frame endless ocean views, while the infinity pool blends seamlessly with the horizon. Every detail has been curated for the discerning traveler.",
    amenities: ["Infinity Pool", "Ocean View", "Private Beach", "Chef's Kitchen", "Smart Home", "Wi-Fi", "Parking", "Air Conditioning"],
    whatsapp: "+1234567890",
    available: true,
  },
  {
    id: "skyline-penthouse-nyc",
    title: "Skyline Penthouse with Panoramic Views",
    location: "Manhattan, New York",
    price: 680,
    currency: "USD",
    type: "penthouse",
    beds: 3,
    baths: 2,
    guests: 6,
    rating: 4.8,
    reviews: 89,
    image: listing2,
    images: [listing2, listing5, listing1],
    description: "Perched above the Manhattan skyline, this penthouse offers breathtaking 360-degree views. Modern design meets ultimate comfort in this architectural masterpiece.",
    amenities: ["City View", "Rooftop Terrace", "Concierge", "Gym Access", "Smart Home", "Wi-Fi", "Doorman", "Air Conditioning"],
    whatsapp: "+1234567890",
    available: true,
  },
  {
    id: "forest-cabin-retreat",
    title: "Luxury Forest Cabin Retreat",
    location: "Aspen, Colorado",
    price: 320,
    currency: "USD",
    type: "cabin",
    beds: 2,
    baths: 2,
    guests: 4,
    rating: 4.95,
    reviews: 203,
    image: listing3,
    images: [listing3, listing6, listing4],
    description: "Nestled among towering pines, this luxury cabin is the ultimate escape. Vaulted ceilings, a stone fireplace, and floor-to-ceiling windows bring the outdoors in.",
    amenities: ["Fireplace", "Hot Tub", "Mountain View", "Hiking Trails", "BBQ", "Wi-Fi", "Parking", "Heating"],
    whatsapp: "+1234567890",
    available: true,
  },
  {
    id: "boutique-suite-bali",
    title: "Boutique Garden Suite",
    location: "Ubud, Bali",
    price: 195,
    currency: "USD",
    type: "studio",
    beds: 1,
    baths: 1,
    guests: 2,
    rating: 4.85,
    reviews: 156,
    image: listing4,
    images: [listing4, listing1, listing3],
    description: "A serene retreat surrounded by tropical gardens and rice paddies. This boutique suite combines Balinese craftsmanship with modern luxury amenities.",
    amenities: ["Garden View", "Private Pool", "Spa Access", "Breakfast", "Yoga Deck", "Wi-Fi", "Airport Transfer", "Air Conditioning"],
    whatsapp: "+1234567890",
    available: true,
  },
  {
    id: "city-loft-london",
    title: "Designer City Loft",
    location: "Shoreditch, London",
    price: 275,
    currency: "USD",
    type: "apartment",
    beds: 2,
    baths: 1,
    guests: 4,
    rating: 4.7,
    reviews: 94,
    image: listing5,
    images: [listing5, listing2, listing4],
    description: "A curated design loft in the heart of London's creative quarter. Contemporary art, designer furniture, and all the comforts of a five-star hotel.",
    amenities: ["City View", "Designer Interior", "Smart TV", "Espresso Machine", "Washer/Dryer", "Wi-Fi", "Bike Storage", "Air Conditioning"],
    whatsapp: "+1234567890",
    available: true,
  },
  {
    id: "lakeside-house-como",
    title: "Lakeside Modern House",
    location: "Lake Como, Italy",
    price: 520,
    currency: "USD",
    type: "villa",
    beds: 3,
    baths: 2,
    guests: 6,
    rating: 4.92,
    reviews: 78,
    image: listing6,
    images: [listing6, listing3, listing1],
    description: "Contemporary elegance on the shores of Lake Como. A private dock, mountain views, and Italian craftsmanship create an unforgettable lakeside experience.",
    amenities: ["Lake View", "Private Dock", "Heated Floors", "Wine Cellar", "Garden", "Wi-Fi", "Parking", "Air Conditioning"],
    whatsapp: "+1234567890",
    available: false,
  },
];
