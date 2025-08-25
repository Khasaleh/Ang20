import { OrderDetailResponse } from "./OrderDetailResponse";
import { OrderTrackResponse } from "./OrderTrackResponse";
import { Address } from "./address";

export class OrderResponse {
    id!: number;
    deliverDate!: Date;
    orderTime!: Date;
    paymentMethod!: string;
    trackingId!:any;
    shippingCost!: number;
    shippingTax!: number;
    status!: string;
    subtotal!: number;
    tax!: number;
    total!: number;
    discountedTotal! : number;
    customerId!: number;
    customerFirstName!: string;
    customerLastName!: string;
    orderType!: string;
    orderDetails!: OrderDetailResponse[];
    orderTracks!: OrderTrackResponse[];
    orderId!: number;
    paymentStatus!: string;
    orderAddressResponse!: Address;
    qrCodeImage!: string;
    pickupPerson!: string;
    pickupTime!: Date;
    promotionId!: number;
    promotionName!: string;
    discount!: number;
    promotionDiscount!: number;
    totalDiscount!: number;
    businessOrderId!: string;
    contactCustomerNeeded!: boolean;
    paymentCustomerNeeded!: boolean;
    billingAddressNeeded!: boolean;
    shippingAddressNeeded!: boolean;
    pickupPersonNeeded!: boolean;
    contactCustomerReason!: string;
    pickUpPersonResponse!: PickUpPersonResponse;
    billingAddressResponse!: BillingAddressResponse;
    deliveredOrderImageUrl!: string;
    returnOrderId!: string;
    returnInitiated!: Date;
    returnOrderTracks!: OrderTrackResponse[];
    returnQrCode!: string;
    returnResolutionType!: any;
    returnDeliveryType!: any;
    returnOrderStatus!: string;
    returnLabelUrl!: string;
    customerCancelledReturn!: boolean;
    payerId!: string;
    paymentId!: string;
    saleId!: string;
    authorizationId!: string;
    instrumentType!: string;
    maskedCardNumber!: string;
    cardType!: string;
    brand!: string;
    orderPromotionDiscounts!: number;
    totalPromotionDiscount!: number;
}

export class PickUpPersonResponse {
  firstName!: string;
  lastName!: string;
  phoneNumber!: string;
  email!: string;
}

export class BillingAddressResponse {
  addressLine1!: string;
  addressLine2!: string;
  country!: string;
  city!: string;
  state!: string;
  postalCode!: string;
}
