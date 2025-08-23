import { ProductAttributeDTO } from "./ProductAttributeDTO"
import { ProductVarientDTO } from "./ProductVarientDTO"

export class MainAttributeDto {
  attributeDTO!: ProductAttributeDTO
  imageUrls: string[] = [];
  newImageUrls: string[] = [];
  defaultSku: Boolean = false;
  active: Boolean = true;
  mainImageUrl!: string|null
  skuId!: number
  barcode!: string
  price!: number
  salePrice!: number
  discountPrice!: number
  quantity!: number
  productVarientDTOs!: ProductVarientDTO[]
  images: File[] = [];
  isShowEdit = false;
  availableQuantity!: number;
  packageSizeLength!: number;
  packageSizeWidth!: number;
  packageSizeHeight!: number;
  packageWeight!: number;
}
