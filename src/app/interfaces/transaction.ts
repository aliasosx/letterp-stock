export interface Transaction {
  transactionId: number;
  food: any;
  quantity: number;
  total: number;
  receive: number;
  change: number;
  datetime: Date;
  ticket: number;
  payment: any;
}
