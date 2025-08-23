export class ShippingResponse {
  id!: number;
  countryName!: string;
  shippingRate!: number;
  baseRates!: boolean;
  distanceRate!: number;
  distanceUnit!: string;
  weightRate!: number;
  weightUnit!: number;
  sizeRate!: number;
  sizeUnit!: string;
  shippingType!: string;
  shippingDays!: number;
  rating!: string;
  businessDetailsId!: number;
  status!: string
  createdDate!: Date;
  updatedDate!: Date;
}
