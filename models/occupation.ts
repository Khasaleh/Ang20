import { Address } from "./address";
import { Country } from "./country";

export class Occupation {
  id!:number;
  userId!:number;
  job!:string;
  address!:Address;
  phoneNumber!:string;
  emailId!:string;
  jobBio!:string;
  searchable?:boolean;
  country!:Country;
}
