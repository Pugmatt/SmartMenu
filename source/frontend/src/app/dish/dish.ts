import { Restaurant } from "../restaurant";

export class Dish {
    id: string;
    name: string;
    description: string;
    category: string;
    restaurant: string;
    images: string[];
    rating: number;
    price: number;
    nutritional: Nutritional;
}

export class Nutritional {
  calories: number;
  total_fat: number;
  cholesterol: number;
  sodium: number;
}
