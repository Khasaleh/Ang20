import { ProductResponse } from "./ProductResponse";
import { ProductVarientDTO } from "./ProductVarientDTO";

export class OrderDetailResponse {
    id!: number;
    buingCost!: number;
    orderId!: string;
    productId!: string;
    quantity!: number;
    sellingCost!: number;
    productName!: string;
    available!: Boolean;
    productResponse!: ProductResponse;
    skuId!: number;
    sku!: ProductVarientDTO;
    discount!: number;
    salePrice!: number;
    productTotalQuantity!: number;
    product!: ProductResponse;
    price!: number;
    action = 'ADD';
    returnOrderStatus!: string;
    quantityReturned!: number;
    returnReason!: string;
    tax!: number;
    orderPromotionResponses!: PromotionResponse[];
    itemVariantList!: CartItemVariant[];
    promotionDiscount!: number;
    pickedFromShelf!: boolean;
    status: any;
    acceptedQuantity!: number;
    quantityDifference!: number;
    unavailableReason!: string;
    returnPolicyType!: any
    timePeriodReturn!: number
    gracePeriodReturn!: number
    returnFee!: number
    returnFeeType!: any
    returnPolicyName!: string
    returnQuantity!: number;
    returnReasonType!: string;
    returnPackagingType!: string;
    returnImages!: string[];
    returnSelectedImages!: File[];
    isSelected!: boolean;
    surcharge!: number;
    refundSubTotal: number = 0.0;
    shippingAndHandling: number = 0.0;
    totalEstimatedRefund: number = 0.0;
    taxRefund: number = 0.0;
    restockingFee: number = 0.0;
    applicableRestockingFee!: number;
    noReturnAgain!: boolean;
    acceptedReturnQuantity!: number;
    purchased!: boolean;
    backOrderExpectedDate!: string;
}
export class PromotionResponse {
  promotionName!: string;
  promotionId!: number;
}

export class CartItemVariant {
  attributeName!: string
  attributeValue!: string
}
