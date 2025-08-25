import { MatIconModule } from '@angular/material/icon';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [
    MatIconModule
  ],
  selector: 'app-reviewImageView',
  templateUrl: './reviewImageView.component.html',
  styleUrls: ['./reviewImageView.component.css']
})
export class ReviewImageViewComponent implements OnInit {

  imageUrl!: string;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.imageUrl = this.data.imageUrl;
    
  }

}
