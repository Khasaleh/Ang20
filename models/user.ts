import { Country } from "./country";
import { Occupation } from "./occupation";

export class User {
  id!: number;
  username!: string;
  password!: string;
  email!: string;
  roles!: string[];
  enabled?: boolean;
  firstName!: string;
  lastName!: string;
  dob!: string;
  profilePicture!: string;
  profile!: string;
  coverPhoto!: string;
  theme!: string;
  systemLanguage!: string;
  phone!: string;
  countryCode!: number
  gender!: string;
  aboutMe!: string;
  namePrefix!:string;
  language!:string;
  religiousViews!:string;
  relationshipStatus!: string;
  country!:Country;
  enableTwoFactorAuth?:boolean;
  loyalityToken!:string;
  loyalityPoint!:number;
  selected!:boolean;   // this is only used for tagg-User, so dont use this for anything else!
  markedForDeleted!:boolean;
  activated!:boolean;
  shortName!:string;
  mentionName!:string;    // this is only used for mention-User, so dont use this for anything else!
  showUserInfo?:boolean;
  showFamilyMembersInfo?:boolean;
  showSocialMediaInfo?:boolean;
  showOccupationInfo?:boolean;
  occupation!:Occupation;
  showUserInterests?:boolean;
  userType!: string;
  isSubscribed = false;
  addressList!: Address[]
  paymentDetails!: CCInfo[]
  accessToken!: string;
  refreshToken!: string;
  emailVerified!: boolean;
}


export class Address {
  id!:number;
  addressId!:number;
  addressDescription!:string;
  addressLine1!:string;
  addressLine2!:string;
  country!:string;
  state!:string;
  city!:string;
  zipCode!:string;
  streetNumber!:string;
  defaultBilling?:boolean;
  defaultShipping?:boolean;
  userId!:number;
  businessId!: number;
  fazealUserId!: boolean;
  longitude!:number|null;
  latitude!:number|null;
  addressInstruction!:string;
}

export class CCInfo {
  id!:number;
  cardHolderName!:string;
  cardType!:string;
  expiryDate!:string;
  lastFourDigits!:string;
  isDefault!: boolean;
}
