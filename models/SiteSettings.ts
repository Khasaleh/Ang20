import { ImageResponse } from "./ImageResponse";

export class SiteSettings {
  id!: number;
  businessId!: number;
  themeName!: string;
  imageResponses!: ImageResponse[];
}
