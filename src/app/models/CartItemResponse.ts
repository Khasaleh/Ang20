import { CartItemPromotionResponse } from "./CartItemPromotionResponse";
import { CartItemVariant } from "./CartItemVariant";
import { ProductResponse } from "./ProductResponse";
import { ProductVarientDTO } from "./ProductVarientDTO";

export class CartItemResponse {
  id!: number;
  customerId!: number;
  productId!: number;
  skuId!: number;
  quantity!: number;
  price!: number;
  salePrice!: number;
  sellerPrice!: number;
  customerPrice!: number;
  productResponse!: ProductResponse;
  sku!: ProductVarientDTO;
  mainSkuId!: number;
  discount! : number;
  promotionItem! : boolean;
  availableQuantity!: number;
  productName!: string;
  productBrandName!: string;
  itemImage!: string;
  itemVariantList!: CartItemVariant[]
  cartItemPromotionResponses!: CartItemPromotionResponse[];
  cacheQuantity!: number;
  shippingRate!: number;
  productDescription!: string
  categoryName!: string
  url!: string
}
