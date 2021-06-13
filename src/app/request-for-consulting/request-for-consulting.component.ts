import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { Consulting } from '../../models/consulting.model';

@Component({
  selector: 'app-request-for-consulting',
  templateUrl: './request-for-consulting.component.html',
  styleUrls: ['./request-for-consulting.component.scss']
})
export class RequestForConsultingComponent implements OnInit {
  title = '컨설팅 신청';
  showTextField = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit(f: NgForm){
    console.log(f.value);

    const scores = {
      korean: f.value.korean,
      english: f.value.english,
      math: f.value.math,
      society: f.value.society,
      science: f.value.science,
      history: f.value.history,
      choice: f.value.choice
    };

    const hope = {
      1: {
        uni: f.value.uni1,
        major: f.value.major1
      },
      2: {
        uni: f.value.uni2,
        major: f.value.major2
      },
      3: {
        uni: f.value.uni3,
        major: f.value.major3
      },
      4: {
        uni: f.value.uni4,
        major: f.value.major4
      },
      5: {
        uni: f.value.uni5,
        major: f.value.major5
      },
      6: {
        uni: f.value.uni6,
        major: f.value.major6
      }
    };

    const body = new Consulting(
      f.value.name + f.value.age + f.value.gender,
      f.value.name,
      f.value.age,
      f.value.gender,
      scores,
      f.value.average,
      f.value.option,
      f.value.application,
      f.value.application === '4' ? f.value.description : '',
      f.value.application_reason,
      hope,
      f.value.note,
      f.value.date + ' ' + f.value.time,
      f.value.check ? 1 : 0,
      f.value.account,
      '',
      false
    );

    // const body = {
    //   key: 'unique_key',
    //   name: '이름',
    //   age: 17,
    //   gender: 'm',
    //   scores: {
    //     korean: 34,
    //     english: 56,
    //     math: 87,
    //     society: 77,
    //     science: 89,
    //     history: 100,
    //     choice: 94
    //   },
    //   average: 86,
    //   application: '0',
    //   application_reason: '어쩌구 저쩌구',
    //   hope: {
    //     1: {
    //       uni: '대학1',
    //       major: '전공1'
    //     },
    //     2: {
    //       uni: '대학2',
    //       major: '전공2'
    //     },
    //     3: {
    //       uni: '대학3',
    //       major: '전공3'
    //     },
    //     4: {
    //       uni: '대학4',
    //       major: '전공4'
    //     },
    //     5: {
    //       uni: '대학5',
    //       major: '전공5'
    //     },
    //     6: {
    //       uni: '대학6',
    //       major: '전공6'
    //     }
    //   },
    //   note: '',
    //   date_time: '2021-03-28 14:30-15:30',
    //   check: 1,
    //   account: '1002-857-980326 우리은행 강예은',
    // };

    console.log(body);

    this.http.post('http://localhost:4000/api/consulting/save', body)
      .subscribe(
        (val) => {
          console.log(val);
          alert('컨설팅이 성공적으로 신청되었습니다');
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('complete');
        }
      );
  }

  onHideTextField(): void{
    this.showTextField = false;
  }
}
