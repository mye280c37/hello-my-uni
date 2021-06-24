import {Component, Input, OnInit} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { Review } from '../../../models/review.model';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
  loadReviews = true;
  @Output() getDetail = new EventEmitter<boolean>();
  @Output() postId = new EventEmitter<number>();
  @Input() reviewList: [number, Review, string][] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onChangeGetDetail(id: number): void{
    this.postId.emit(id);
  }
}
