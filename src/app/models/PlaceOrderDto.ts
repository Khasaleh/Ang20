export class PlaceOrderDto {
  businessId!: number;
  cartId!: number;
  paymentType!: string;
  addressId!: number;
  orderType!: string;
  orderId!: number;
  pickupPerson!: string;
  pickupTime!: string;
  tax!: number;
  surcharges!: number;
  pickUpPersonDTO: any;
  // cardInfoDTO: {
  //   cardId: null
  //   cardNumber: "",
  //   expirationMonth: "",
  //   expirationYear: "",
  //   securityCode: "",
  //   cardType: "VISA"
  // }
}
