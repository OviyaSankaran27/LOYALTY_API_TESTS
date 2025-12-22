export interface Bill {
  invoiceType: string;
  billType: string;
  channel: string;
  billDate: string;
  billLevelOfferDiscount: number;
  billLevelProductDiscount: number;
  billLevelLoyaltyDiscount: number;
  totalDiscountAmount: number;
  billGuId: string;
  billId: string;
  orderId: string;
  orderStatus: string;
  orderStatusCreationDateTime: string;
  orderItems: any[];
  paymentSplits: any[];
  offerCodes: string[];
  billAmount: number;
  billNetAmount: number;
  storeName: string;
  customerMobile: string;
  customerName: string;
  customerEmail: string;
  billTaxAmount: number;
}
