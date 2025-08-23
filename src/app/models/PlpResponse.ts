import { CategoryResponse } from "./CategoryResponse";
import { ProductResponse } from "./ProductResponse";

export class PlpResponse {
  breadcrumbsDesign!: string
  breadcrumbsEnabled!: boolean
  productsRows!: number;
  productsCols!: number;
  cartButtonEnabled!: boolean
  leftPanelEnabled!: boolean
  leftPanelCategoriesEnabled!: boolean
  leftPanelPriceEnabled!: boolean
  leftPanelColorEnabled!: boolean
  leftPanelSizeEnabled!: boolean
  relatedProductsEnabled!: boolean
  footerBannerEnabled!: boolean
  footerBannerTextColor!: boolean
  footerBannerBGColor!: boolean
  recentlyViewedEnabled!: boolean
  bestsellerProductsEnabled!: boolean
  sortByFilterEnabled!: boolean
  bestSellerProducts!: ProductResponse[];
  products!: ProductResponse[];
  themeName!: string;
  themeColor!: string;
  category!: CategoryResponse;
  recentlyViewedProductHeading!: string;
  recentlyViewedProductHeadingEnabled!: boolean
}
