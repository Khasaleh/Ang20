import { ProductAttributeDTO } from "./ProductAttributeDTO";

export class ProductVarientDTO {
  skuId!: number;
  skuName!: string;
  description!: string;
  barcode!: string;
  partNumber!: string;
  price!: number;
  salePrice!: number;
  discountPrice!: number;
  quantity!: number;
  image!: File;
  imageUrl!: string[];
  productAttributeDTOs!: ProductAttributeDTO[];
  isShow = false;
  active!: boolean;
  availableQuantity!: number;
  packageSizeLength!: number;
  packageSizeWidth!: number;
  packageSizeHeight!: number;
  packageWeight!: number;
}
