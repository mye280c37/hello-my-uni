import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-post',
  templateUrl: './review-post.component.html',
  styleUrls: ['./review-post.component.scss']
})
export class ReviewPostComponent implements OnInit {
  title = '후기 작성';

  constructor() { }

  ngOnInit(): void {
  }

}
