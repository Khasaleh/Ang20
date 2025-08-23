import { AnnouncementBarResponse } from "./AnnouncementBarResponse";
import { BannerImageResponse } from "./BannerImageResponse";
import { BrandSliderResponse } from "./BrandSliderResponse";
import { CopyrightsResponse } from "./CopyrightsResponse";
import { FooterResponse } from "./FooterResponse";
import { ProductResponse } from "./ProductResponse";
import { SiteOptionResponse } from "./SiteOptionResponse";
import { Testimotional } from "./Testimotional";
import { TextSliderResponse } from "./TextSliderResponse";
import { ThemeColorResponse } from "./ThemeColorResponse";


export class ThemeDashboardContent {
  favIcon!: string;
  siteLogo!: string;
  announcementBar!: AnnouncementBarResponse;
  mainBannersEspot!: BannerImageResponse[];
  threeInOneBannersEspot!: BannerImageResponse[];
  espotBanners!: BannerImageResponse[];
  flashSaleProducts!: ProductResponse[];
  bestSellerProducts!: ProductResponse[];
  recentlyViewedProducts!: ProductResponse[];
  newlyAddedProducts!: ProductResponse[];
  eSpotTextSlider!: TextSliderResponse;
  brandsSlider!: BrandSliderResponse[];
  footer!: FooterResponse;
  copyrights!: CopyrightsResponse;
  themeName!: string;
  themeColorsResponse!: ThemeColorResponse;
  siteOptionsResponses!: SiteOptionResponse[];
  customerReviewsDesign!: string;
  customerReviews!: Testimotional[];
  recentlyViewedSliderHeading!: string;
  recentlyViewedSliderStyle!: string;
  threeInOneEnableHeadline!:boolean;
  threeInOneSliderHeadline!:string;
  chatSettingResponse!: ChatSettingResponse;
  bestSellerSliderStyle!: string;
  flashProductSliderStyle!: string;
  flashSaleSliderHeading!: string;
  bestSellerSliderHeading!: string;
  newlyAddedSliderHeading!: string;
  customerReviewSliderHeading!: string;
  customerReviewSliderStyle!: string;
  brandSliderStyle!: string;
  newlyAddedSliderStyle!: string;
  topMenu!:TopMenuResponse;
  brandSliderHeading!:string;
  brandShowHeading!:boolean;
}

export interface ChatSettingResponse {
  id: number
  iconPosition: string
  iconStyle: string
  color: string
  createdDate: string
  updatedDate: string
}

export interface TopMenuResponse {
  id: number
  storeDetails: boolean
  wishlist: boolean
  signInAndSignUp: boolean
  createdDate: string
  updatedDate: string
  cart: boolean
  design: string
  country: string
  language: string
  currency: string
}
