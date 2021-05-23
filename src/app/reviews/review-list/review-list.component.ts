import {Component, Input, OnInit} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { Review } from '../review.model';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
  loadReviews = true;
  @Output() getDetail = new EventEmitter<boolean>();
  @Output() postId = new EventEmitter<number>();
  @Input() reviewList: Review[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onChangeGetDetail(id: number){
    this.postId.emit(id);
  }
}
