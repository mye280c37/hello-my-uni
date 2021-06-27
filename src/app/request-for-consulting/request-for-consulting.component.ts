import * as $ from 'jquery';
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

  application = [
    '학생부 교과(검정고시 성적)',
    '학생부 교과 면접(검정고시 성적 + 면접)',
    '학생부 종합(검정고시 성적 + 자기소개서 작성 + 면접)',
    '정시(수능)',
    '기타'
  ];
  consultingOption = [
    '수시지원',
    '자기소개서 컨설팅',
    '면접 컨설팅',
    '논술 첨삭'
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit(f: NgForm){
    console.log(f.value);

    if (f.value.korean && f.value.english && f.value.math && f.value.society && f.value.history && f.value.choice) {
      const scores = {
        korean: f.value.korean,
        english: f.value.english,
        math: f.value.math,
        society: f.value.society,
        science: f.value.science,
        history: f.value.history,
        choice: f.value.choice
      };
      if (f.value.uni1 && f.value.major1 && f.value.uni2 && f.value.major2 && f.value.uni3 && f.value.major3
        && f.value.uni4 && f.value.major4 && f.value.uni5 && f.value.major5 && f.value.uni6 && f.value.major6) {
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
        if (f.value.option0 || f.value.option1 || f.value.option2 || f.value.option3){
          let optionVal = '';
          for (let i = 0; i < 4; i++){
            const optionEle = $('input[name="option' + i + '"]');
            if (optionEle.prop('checked')){
              optionVal += this.consultingOption[parseInt(optionEle.val() as string, 10)];
              optionVal += '/';
            }
          }

          console.log(optionVal);
          if (f.value.application0 || f.value.application1 || f.value.application2 || f.value.application3 || f.value.application4){
            let applicationVal = '';
            for (let i = 0 ; i < 5; i++){
              const applicationEle = $('input[name="application' + i + '"]');
              if (applicationEle.prop('checked')){
                applicationVal += this.application[parseInt(applicationEle.val() as string, 10)];
                applicationVal += '/';
              }
            }
            $('input[name="application"]:checked').each((e) => {
              const value = $(this).val();
              applicationVal += value;
              applicationVal += '/';
            });
            console.log(applicationVal);
            if (f.value.name && f.value.age && f.value.gender && f.value.email && f.value.phone) {
              const application4Ele = $('input[name="application4"]');
              if ((application4Ele.prop('checked') && f.value.description) || !application4Ele.prop('checked')) {
                if (f.value.application_reason && f.value.check && f.value.account) {
                  const body = new Consulting(
                    f.value.name + f.value.age + f.value.gender + f.value.email + f.value.phone,
                    f.value.name,
                    f.value.age,
                    f.value.gender,
                    f.value.email,
                    f.value.phone,
                    scores,
                    f.value.average,
                    optionVal,
                    applicationVal,
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

                  console.log(body);

                  this.http.post('https://site.hellomyuni.com/api/consulting/create', body)
                    .subscribe(
                      (val) => {
                        console.log(val);
                        alert('컨설팅이 성공적으로 신청되었습니다. 입금 확인 후 진행되는 개별 연락을 기다려 주세요.');
                        location.reload();
                      },
                      err => {
                        console.log(err);
                      },
                      () => {
                        console.log('complete');
                      }
                    );
                }
              }
            }
          }
        }
      }
    }else{
      alert('필수 항목을 모두 채워주세요');
    }
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
  }

  onHideTextField(): void{
    this.showTextField = false;
  }
}
