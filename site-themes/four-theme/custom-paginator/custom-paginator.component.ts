import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.css']
})
export class CustomPaginatorComponent implements OnInit, OnChanges {

  @Input() length: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  @Output() page = new EventEmitter<PageEvent>();
  pages: number[] = [];

  constructor() { }


  ngOnInit() {
  }

  ngOnChanges() {
    if (this.length && this.pageSize && this.pageSize > 0) {
      const totalPages = Math.ceil(this.length / this.pageSize);
      this.pages = Array(totalPages).fill(0).map((x, i) => i);
    } else {
      this.pages = [];
    }
  }

  hasPrevPage(): boolean {
    return this.pageIndex > 0;
  }

  hasNextPage(): boolean {
    return this.pageIndex < this.pages.length - 1;
  }

  goToPage(page: number) {
    this.pageIndex = page;
    this.emitPageEvent();
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: Adds a smooth scrolling effect
    });
  }

  prevPage() {
    if (this.hasPrevPage()) {
      this.pageIndex--;
      this.emitPageEvent();
    }
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.pageIndex++;
      this.emitPageEvent();
    }
  }

  isCurrentPage(page: number): boolean {
    return this.pageIndex === page;
  }

  emitPageEvent() {
    this.page.emit({ length: this.length, pageSize: this.pageSize, pageIndex: this.pageIndex });
  }


}
