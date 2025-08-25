import { AttributeValueResponse } from "./AttributeValueResponse";

export class AttributeResponse {
  id!: number;
  businessId!: number;
  userId!: number;
  name!: string;
  showAttribute!: Boolean;
  isColor!: Boolean;
  attributeValues!: AttributeValueResponse[];
}
