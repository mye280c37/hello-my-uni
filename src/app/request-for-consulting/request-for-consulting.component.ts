import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-request-for-consulting',
  templateUrl: './request-for-consulting.component.html',
  styleUrls: ['./request-for-consulting.component.scss']
})
export class RequestForConsultingComponent implements OnInit {
  title = '상담 신청';
  showTextField = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit(f: NgForm){
    console.log(f.value);

    const body = {
      key: 'unique_key',
      name: '이름',
      age: 17,
      gender: 'm',
      scores: {
        korean: 34,
        english: 56,
        math: 87,
        society: 77,
        science: 89,
        history: 100,
        choice: 94
      },
      average: 86,
      application: '0',
      application_reason: '어쩌구 저쩌구',
      hope: {
        1: {
          uni: '대학1',
          major: '전공1'
        },
        2: {
          uni: '대학2',
          major: '전공2'
        },
        3: {
          uni: '대학3',
          major: '전공3'
        },
        4: {
          uni: '대학4',
          major: '전공4'
        },
        5: {
          uni: '대학5',
          major: '전공5'
        },
        6: {
          uni: '대학6',
          major: '전공6'
        }
      },
      note: '',
      date_time: '2021-03-28 14:30-15:30',
      check: 1,
      account: '1002-857-980326 우리은행 강예은'
    };

    this.http.post('http://localhost:5000/api/consulting/save', body)
      .subscribe();
  }

  onHideTextField(){
    this.showTextField = false;
  }
}
