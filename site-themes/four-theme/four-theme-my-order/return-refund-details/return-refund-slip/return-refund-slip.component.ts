import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { BusinessSettingService } from 'src/app/service/business-setting.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-return-refund-slip',
  templateUrl: './return-refund-slip.component.html',
  styleUrls: ['./return-refund-slip.component.css']
})
export class ReturnRefundSlipComponent implements OnInit {

  order!: OrderResponse;
  businessAddresses: Address[] = [];
  qrCodeImage!: string;
  currency = this.tokenService.getCurrency()?.symbol;
  businessDetails: any;
  awsURL = environment.awsKey;
  constructor(private tokenService: TokenStorageService, private businessSettingService: BusinessSettingService) { }

  ngOnInit() {
    this.order = this.tokenService.getReturnOrder();
    this.order.orderDetails = this.order?.orderDetails?.filter(order => order?.returnPolicyType?.toString() !== 'SALES_ARE_FINAL');
    this.order.orderDetails = this.order?.orderDetails?.filter(order => order?.returnQuantity > 0);
    this.order.orderDetails = this.order?.orderDetails?.filter(order => order?.quantity > 0);
    this.qrCodeImage = this.generateQRCode(this.order.returnQrCode);
    this.getBusinessDetails();
    this.listBusinessAddresses();
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);  
  }

  getBusinessDetails(){
    this.businessSettingService.getBusinessDetailsById(Number(this.tokenService.getBusinessID()))
    .subscribe(data => {
      if(data?.data?.getBusinessDetailsById){
        this.businessDetails = data?.data?.getBusinessDetailsById;
      }
    });
   }
  listBusinessAddresses(){
    this.businessSettingService.getBusinessAddressesByBusinessId(Number(this.tokenService.getBusinessID()))
    .subscribe(data => {
      if(data?.data?.getBusinessAddressesByBusinessId){
        this.businessAddresses = data?.data?.getBusinessAddressesByBusinessId;
        this.businessAddresses = this.businessAddresses?.filter(address => address?.addressType == 'STORE');
      }
    });
   }

   generateQRCode(qrCodebase64: any): string {
    return `data:image/png;base64,${qrCodebase64}`;
  }

  print_slip() {
    window.print();
  }

}
