export class BannerImageResponse {
  id!: number;
  businessId!: number;
  categoryId!: number;
  imageBackgroundColor!: string;
  imageDescription!: string;
  imagePosition!: number;
  imageTagline!: string;
  imageTitle!: string;
  imageType!: string;
  imageUrl!: string;
  mainBannerDesign!: string;
  espotBannerDesign!: string; 

  actionButtonColor!: string;
  actionButtonFont!: string;
  actionButtonRedius!: string;
  actionButtonText!: string;
  actionButtonBold!: boolean;
  actionButtonItalic!: boolean;
  actionButtonFontSize!: string;

  taglineBold!: boolean;
  taglineItalic!: boolean;
  taglineFontSize! :string;
  taglineFont!: string;
  
  titleBold!: boolean;
  titleFont!: string;
  titleItalic!: boolean;
  titleFontSize!: string;
}
