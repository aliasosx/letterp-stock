export interface Product {
  uuids: string;
  barcode: string;
  productCode: string;
  productName: string;
  cost: number;
  vendorId: number;
  minimumQuantity: number;
  currentQuantity: number;
  productTypeCode: string;
  foodId?: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
