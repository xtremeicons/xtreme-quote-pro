export interface Material {
  id: number;
  category: string;
  name: string;
  unit: string;
  cost: number;
  waste: number;
  recommendedMarkup: number;
  premiumMarkup: number;
}

export const materials: Material[] = [
  {
    id: 1,
    category: "Banner",
    name: "13 oz Matte",
    unit: "ft²",
    cost: 0.85,
    waste: 10,
    recommendedMarkup: 150,
    premiumMarkup: 200,
  },
  {
    id: 2,
    category: "Banner",
    name: "13 oz Gloss",
    unit: "ft²",
    cost: 0.95,
    waste: 10,
    recommendedMarkup: 150,
    premiumMarkup: 200,
  },
];