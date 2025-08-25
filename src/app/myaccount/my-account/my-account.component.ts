import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { MyAccountService } from 'src/app/shared/services/myaccount.service';
import { SeoService } from 'src/app/shared/services/seo.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import { MyOrdersComponent } from '../my-orders/my-orders.component';
import { MyQuotesComponent } from '../my-quotes/my-quotes.component';
import { MyTransactionHistoryComponent } from '../my-transaction-history/my-transaction-history.component';
import { MySubscriptionsComponent } from '../my-subscriptions/my-subscriptions.component';
import { MyCasesComponent } from '../my-cases/my-cases.component';
import { MyWalletComponent } from '../my-wallet/my-wallet.component';
import { MyCompanyComponent } from '../my-company/my-company.component';
import { MyUsersComponent } from '../my-users/my-users.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatTabsModule,
        MyProfileComponent,
        MyOrdersComponent,
        MyQuotesComponent,
        MyTransactionHistoryComponent,
        MySubscriptionsComponent,
        MyCasesComponent,
        MyWalletComponent,
        MyCompanyComponent,
        MyUsersComponent,
        TranslateModule,
    ],
})
export class MyAccountComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscription: Subscription = new Subscription();
  public customerInfo: any;
  public store_information: any;
  public selectedTab: string = 'MyProfileComponent';
  public myaccountTabs:any[]=[];
  public isAgent:boolean = false;
  constructor(
    private router: Router,
    private myAccountService: MyAccountService,
    private seoService: SeoService,
    private titleService: Title,
    private translate: TranslateService,
    private breadcrumbService: BreadcrumbService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isAgent = localStorage.getItem('isagent') ? true : false;
    this.get_store_information();
    this.getCustomerInfo();
    this.subscription = this.myAccountService.myaccount$.subscribe(
      (myaccountTab: any) => {
        this.selectedTab = myaccountTab;
      }
    );
    this.seoService.updateTitle(this.translate.instant('my_account_page_title'));
    this.seoService.updateMetaTags(
      this.translate.instant('my_account_page_meta_description'),
      this.translate.instant('my_account_page_meta_keywords'),
      this.translate.instant('my_account_page_meta_og_title'),
      this.translate.instant('my_account_page_meta_og_description'),
      this.translate.instant('my_account_page_meta_og_image'),
      this.translate.instant('my_account_page_meta_og_url')
    );
  }
  ngAfterViewInit(): void {
    this.breadcrumbService.sendBreadcrumb(['My Account']);
  }
  get_store_information() {
    this.myAccountService.get_store_information().subscribe((res) => {
      this.store_information = res;
    });
  }

  getCustomerInfo() {
    this.myAccountService.getCustomerInfo().subscribe((data) => {
      this.customerInfo = data;
      this.filterTabs();
    });
  }
  filterTabs(){
    const tabs = [
      {
        label: this.translate.instant('my_profile'),
        component: 'MyProfileComponent',
        isEnable: true,
      },
      {
        label: this.translate.instant('my_orders'),
        component: 'MyOrdersComponent',
        isEnable: true,
      },
      {
        label: this.translate.instant('my_quotes'),
        component: 'MyQuotesComponent',
        isEnable:this.customerInfo?.is_rfq_enabled && this.store_information?.is_rfq_enabled,
      },
      {
        label: this.translate.instant('transaction_history'),
        component: 'MyTransactionHistoryComponent',
        isEnable: true,
      },
      {
        label: this.translate.instant('my_subscriptions'),
        component: 'MySubscriptionsComponent',
        isEnable: this.customerInfo?.is_subscription_enabled,
      },
      {
        label: this.translate.instant('my_cases'),
        component: 'MyCasesComponent',
        isEnable: this.customerInfo?.is_help_desk_enabled,
      },
      {
        label: this.translate.instant('my_wallet'),
        component: 'MyWalletComponent',
        isEnable:
          this.customerInfo?.is_store_credit_enabled ||
          this.customerInfo?.is_reward_points_enabled,
      },
      {
        label: this.translate.instant('my_company'),
        component: 'MyCompanyComponent',
        isEnable: this.customerInfo?.is_sub_account_enabled && this.customerInfo?.parent_customer_id == 0,
      },
      {
        label: this.translate.instant('my_users'),
        component: 'MyUsersComponent',
        isEnable: this.customerInfo?.is_sub_account_enabled && this.customerInfo?.parent_customer_id == 0,
      },
    ];
    this.myaccountTabs = tabs.filter(tab => tab.isEnable);
  }
  onTabChange(event: any) {
    this.selectedTab = this.myaccountTabs[event.index].component;
  }

  public get selectedIndex(): number {
    return this.myaccountTabs.findIndex(tab => tab.component === this.selectedTab);
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
