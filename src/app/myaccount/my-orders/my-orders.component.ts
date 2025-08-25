import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MyAccountService } from 'src/app/shared/services/myaccount.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ReorderComponent } from '../reorder/reorder.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-my-orders',
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        TranslateModule,
    ],
})
export class MyOrdersComponent implements OnInit, AfterViewInit, OnDestroy {
  public orderList: MatTableDataSource<any>;
  public orderStatusList: any[];
  public displayedColumns: string[] = [
    'increment_id',
    'created_at',
    'shipped_to',
    'order_total',
    'status',
    'actions',
  ];
  public filterJson = {
    page: 1,
    pageSize: 10,
    search_text: '',
    order_status: '',
    date_from: '',
    date_to: '',
  };
  public searchUpdate = new Subject<any>();
  private subscription: Subscription = new Subscription();
  public totalOrders: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private myAccountService: MyAccountService,
    private router: Router,
    private datePipe: DatePipe,
    private dialog: MatDialog,
  ) {
    this.orderList = new MatTableDataSource<any>();
    this.orderStatusList = [];
    this.searchUpdate
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.filterJson.search_text = value.target.value;
        this.applyFilter();
      });
  }

  ngOnInit(): void {
    this.getOrderStatusList();
    this.getOrderList();
  }
  ngAfterViewInit() {}
  getOrderStatusList() {
    this.myAccountService.getOrderStatusList().subscribe((data) => {
      this.orderStatusList = data.filter((status) => status.value !== '');
    });
  }
  getOrderList() {
    this.myAccountService.getOrderList(this.filterJson).subscribe((data) => {
      this.orderList = new MatTableDataSource(data.items);
      this.totalOrders = data.total_count;
    });
  }
  applyFilter() {
    this.filterJson.page = 1;
    this.paginator.pageIndex = 0;
    this.getOrderList();
  }
  public onPageChanged(event: any): void {
    this.filterJson.page = event.pageIndex + 1;
    this.filterJson.pageSize = event.pageSize;
    this.getOrderList();
  }
  onDateChange(event: MatDatepickerInputEvent<any>, type: string) {
    if (type === 'date_from') {
      this.filterJson.date_from = moment(event.value).format('MM/DD/YYYY');
    } else {
      this.filterJson.date_to = moment(event.value).format('MM/DD/YYYY');
    }
    this.applyFilter();
  }
  clearDate(type: string) {
    if (type === 'date_from') {
      this.filterJson.date_from = '';
    } else {
      this.filterJson.date_to = '';
    }
    this.applyFilter();
  }
  navigateToOrderView(orderId: number) {
    this.router.navigate(['/myaccount/order-view', orderId]);
  }
  reorder(orderId: number) {
    this.myAccountService.reorder({order_id:orderId}).subscribe((data) => {
      if(data.quote_id){
        this.router.navigate(['/cart']);
      }
    });
  }
  openReorderDialog(orderId: number, isReorder: boolean) {
    const dialogRef = this.dialog.open(ReorderComponent, {
      data: { order_id: orderId, is_reorder_entire_cart: isReorder },
      panelClass: 'reorder-dialog',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/cart']);
      }
    });
  }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
