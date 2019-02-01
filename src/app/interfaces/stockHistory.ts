export interface StockHistory {
  productName: string;
  beforeQuantity: number;
  stockChange: string;
  currentQuantity: number;
  updateDate: Date;
  updateSource: string; // Sale module Or Purchase
  purchaseDetail: object;
  createdAt: Date;
}
