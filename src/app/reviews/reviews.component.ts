import { Component, OnInit } from '@angular/core';

import { Review } from '../../models/review.model';
import { HttpClient } from '@angular/common/http';
import { ReviewBoardService } from './reviews.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  loadReviews = true;
  getDetail = false;
  objId = '';
  reviewId = 0;
  reviewPost: Review = new Review(
    '',
    '',
    '',
    '',
    '',
  );
  reviews: [number, Review, string][] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getDetail = false;
    console.log('ngOnInit');

    this.http.get<ReviewBoardService>(environment.apiUrl + '/api/review/board')
      .subscribe(
        (val) => {
          console.log(val.result);
          this.createReviewList(val.result);
        },
        err => {
          console.log(err);
          console.log(err.status);
        },
        () => {
          console.log('complete');
        }
      );
  }

  createReviewList(result: any): void{
    for (let i = 0 ; i < result.length; i++){
      this.reviews.push([
          i,
          new Review(
            result[i].title,
            result[i].body,
            this.markAuthor(result[i].author),
            result[i].password,
            result[i].time
          ),
        result[i]._id,
      ]);
    }
    console.log(this.reviews);
  }

  getDetailHandlerWithId(id: number): void{
    this.objId = this.reviews[id][2] as string;
    this.reviewId = this.reviews[id][0];
    console.log(id);
    this.getDetail = true;
    this.reviewPost = this.reviews[id][1] as Review;
  }

  getDetailHandler(e: boolean): void{
    console.log(e);
    this.getDetail = e;
  }

  markAuthor(name: string): string{
    const nameLength = name.length;
    let markedName = name[0];
    for (let i = 1; i < nameLength - 1; i++){
      markedName += '*';
    }
    markedName += name[nameLength - 1];
    return markedName;
  }

}
