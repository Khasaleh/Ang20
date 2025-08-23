import { CartItemResponse } from "./CartItemResponse";
import { OrderLevelPromotionResponse } from "./OrderLevelPromotionResponses";

export class ShoppingCartResponse {
  id!: number;
  totalSalesTaxes!: number;
  orderId!: number;
  customerId!: number;
  businessId!: number;
  totalPrice!: number;
  subTotal!: number;
  totalItemsPrice!: number;
  totalDiscount!: number;
  totalPromoitionDiscount!: number;
  discountedShippingCost!: number;
  isFixedAmountForShipping!: number;
  cartItemResponseList: CartItemResponse[] = [];
  orderLevelPromotionResponses: OrderLevelPromotionResponse[] = [];
  shippingLevelPromotionResponses: OrderLevelPromotionResponse[] = [];
  cartMessagesResponses!: CartMessagesResponses[];
  catalogPromotionDiscounts!: number
  totalSurchargesTaxes!: number
  totalShippingTaxes!: number
  totalApplicableTaxes!: number
  shippingCost!: number
  discount!: number
  rejectedPromoCodes!: string[];
  manualPromoCodes!: string[];
  appliedShippingPromotions!: any[];
  appliedOrderPromotions!: any[];
  appliedCatalogPromotions!: any[];
}


export class CartMessagesResponses{
  message!: string;
  from!: number;
  to!: number;
  createdAt!: Date;
  productName!: string;
  productId!: number;
}
