import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-ged-conversion',
  templateUrl: './ged-conversion.component.html',
  styleUrls: ['./ged-conversion.component.scss']
})
export class GedConversionComponent implements OnInit {
  // data: object;
  renewal = false;
  result = false;
  exampleResult = [
      {
        university : '강원대학교',
        area: '경기',
        converted : 663.56,
      },
      {
        university : '아사렛대학교',
        area: '전남',
        converted : 10.1,
      },
      {
        university : '나다대학교',
        area: '경기',
        converted : 56,
        link: 'https://my-uni-91dde.firebaseapp.com/'
      },
      {
        university : '아주대학교',
        area: '서울/경기',
        converted : 43,
      },
      {
        university : '서강대학교',
        area: '서울/경기',
        converted : 93.56,
      },
      {
        university : '전남대학교',
        area: '전남',
        converted : 300,
        link: 'https://my-uni-91dde.firebaseapp.com/'
      },
      {
        university : '제주대학교',
        area: '제주',
        converted : 66,
        link: 'https://my-uni-91dde.firebaseapp.com/'
      }
  ];


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.result = false;
  }

  onSubmit(f: NgForm): void{
    console.log(f.value);

    f.value.status = '0';

    console.log(f.value);

    if (this.renewal){
      this.http.get('http://localhost:5000/api/converter/each', {params: f.value})
        .subscribe(
          (val) => {
            console.log(val);
           /*
           * type별로 array에 묶여서 정보 들어옴
           */
          },
          err => {
            console.log(err);
          },
          () => {
            console.log('complete');
          }
        );
    }else{
      alert('서버 리뉴얼 중입니다. 4월 중 재개 예정입니다.');
      this.result = true;

      const eleMoveTo = document.getElementById('table');
      if (eleMoveTo != null){
        window.scrollTo(0, eleMoveTo.offsetTop - 50);
      }
    }
  }
}
