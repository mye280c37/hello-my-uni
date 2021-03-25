import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  title = '후기';
  loadReviews = false;

  constructor() { }

  ngOnInit(): void {
  }

}
