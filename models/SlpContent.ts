import { AnnouncementBarResponse } from "./AnnouncementBarResponse";
import { FooterResponse } from "./FooterResponse";

export class SlpContent {
  themeName!: string;
  themeColor!: string;
  showPerPageFilter!: boolean;
  showResultFilter!: boolean;
  productsPerPage!: number;
  design!: string;
  paginationAlignment!: string;
  leftPanelEnabled!: boolean;
  leftPanelCategoriesEnabled!: boolean;
  leftPanelPriceEnabled!: boolean;
  leftPanelReviewEnabled!: boolean;
  leftPanelBrandEnabled!: boolean;
  sortByFilterEnabled!: boolean;
  productsCols!: string;
  productQuickViewEnabled!: boolean;
  announcementBar!: AnnouncementBarResponse;
  footer!: FooterResponse;
}
