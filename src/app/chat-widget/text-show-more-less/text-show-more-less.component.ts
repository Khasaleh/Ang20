import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LinkifyPipe } from '../linkifyPipe/linkify.pipe';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-text-show-more-less',
  templateUrl: './text-show-more-less.component.html',
  styleUrls: ['./text-show-more-less.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule, LinkifyPipe],
})
export class TextShowMoreLessComponent {
  @Input() text: string = '';
  showMore: boolean = false;
  wordLimit = 130;
  constructor(
    private linkify: LinkifyPipe,
    private sanitizer: DomSanitizer,
  ) { }


  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  get linkifiedText(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.linkify.transform(this.text));
  }

  get truncatedText(): SafeHtml {
    const truncated = this.text.substring(0, this.wordLimit) + '...';
    return this.sanitizer.bypassSecurityTrustHtml(this.linkify.transform(truncated));
  }
}
