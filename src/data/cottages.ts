export type Cottage = {
  name: string;
  price: number;
  capacity: number;
  features: string[];
  featured?: boolean;
};

export const cottages: Cottage[] = [
  {
    name: "Small Cottage",
    price: 500,
    capacity: 15,
    features: ["No videoke", "Basic seating", "Open-air setup"],
  },
  {
    name: "Small Cottage with Videoke",
    price: 800,
    capacity: 15,
    features: ["With videoke", "Ideal for gatherings", "Relaxed social setup"],
    featured: true,
  },
  {
    name: "Large Cottage",
    price: 1200,
    capacity: 20,
    features: ["No videoke", "Spacious", "Best for large groups"],
  },
];
