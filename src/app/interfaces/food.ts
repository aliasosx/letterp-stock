export interface Food {
  foodId: number;
  food_name: string;
  food_name_en: string;
  parents_food_name?: string;
  photo?: string;
  foodtypeName?: string;
  cost: number;
  price: number;
  currency: string;
  enabled?: boolean;
  username?: string;
  kitchen?: string;
  enabled_child_food?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
