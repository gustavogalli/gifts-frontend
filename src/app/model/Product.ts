export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  stockQuantity: number;
  soldQuantity: number;
  quantityInCart: number
  price: number;
  discountPercentage: number;
  totalGrossSales: number
}
