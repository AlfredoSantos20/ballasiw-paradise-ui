export type Cottage = {
  name: string;
  price: number;
  capacity: number;
  features: string[];
  featured?: boolean;
};

export const cottages: Cottage[] = [
  {
    name: "Big cottage w/ videoke 30pax",
    price: 2000,
    capacity: 30,
    features: ["With videoke", "Open-air setup", "Best for larger groups"],
  },
  {
    name: "Big cottage w/ videoke 20pax",
    price: 1500,
    capacity: 20,
    features: ["With videoke", "Open-air setup", "Great for group outings"],
  },
  {
    name: "Private Cottage no videoke",
    price: 1500,
    capacity: 30,
    features: ["No videoke", "Private area", "Family-friendly setup"],
  },
  {
    name: "Small cottage",
    price: 500,
    capacity: 15,
    features: ["No videoke", "Basic seating", "Open-air setup"],
  },
];
