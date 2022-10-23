import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Review } from '../../models/review.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-review-post',
  templateUrl: './review-post.component.html',
  styleUrls: ['./review-post.component.scss']
})
export class ReviewPostComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void{
    console.log(f.value);
    const body = new Review(
      f.value.title,
      f.value.body,
      f.value.author,
      f.value.password,
      f.value.consultingTime
    );

    this.http.post(environment.apiUrl + '/v2/review', body)
      .subscribe(
        (val) => {
          console.log(val);
        },
        err => {
          console.log(err);
          console.log(err.status);
          if (err.status === 404){
            alert('후기 등록에 실패하였습니다. 관리자에게 문의 바랍니다.');
          }
        },
        () => {
          console.log('complete');
          alert('후기가 성공적으로 등록되었습니다.');
          if (environment.production){
            window.location.href = 'https://www.hellomyuni.com/reviews';
          }else{
            window.location.href = 'http://localhost:4200/reviews';
          }
        }
      );

  }

  backToList(): void{
    alert('작성된 내용이 저장되지 않습니다');
    if (environment.production){
      window.location.href = 'https://www.hellomyuni.com/reviews';
    }else{
      window.location.href = 'http://localhost:4200/reviews';
    }
  }
}
