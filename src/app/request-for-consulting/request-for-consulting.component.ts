import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '../http-response';
import { Consulting } from '../../models/consulting.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-request-for-consulting',
  templateUrl: './request-for-consulting.component.html',
  styleUrls: ['./request-for-consulting.component.scss']
})
export class RequestForConsultingComponent implements OnInit {
  title = '컨설팅 신청';
  consultingDate: any;
  showTextField = false;
  calenderMonth = new Date().getMonth() + 1;
  calenderYear = new Date().getFullYear();
  calenderDate = 0;
  weekDay = ['일', '월', '화', '수', '목', '금', '토'];
  calender: ((string | never[]| boolean)[] | (number | string[] | boolean)[])[][] = [];
  clicked = false;
  clickedDate = '';
  clickedTimeList: string[] = [];

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
    this.http.get<HttpResponse>(environment.apiUrl + '/api/consulting/date')
      .subscribe(
        (val) => {
          this.consultingDate = val.result;
          console.log(this.consultingDate);
          this.calender = [];
          this.createCalender();
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('complete');
        }
      );
    this.createCalender();
  }

  testSubmit(f: NgForm): void{
    console.log(this.clickedDate);
    console.log(f.value.time);
  }

  checkApplicationValidation(f: NgForm): boolean{
    if (f.value.application0 || f.value.application1 || f.value.application2 || f.value.application3 || f.value.application4) {
      if (f.value.application4) {
        if (!f.value.description) { return false; }
      }
    }else {
      return false;
    }

    return true;
  }

  // tslint:disable-next-line:typedef
  onSubmit(f: NgForm){
    let isValid = false;
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
            major: f.value.major1 ? f.value.major1 : ''
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
        if (f.value.option0 || f.value.option1 || f.value.option2 ){
          let optionVal = '';
          for (let i = 0; i < 4; i++){
            const optionEle = $('input[name="option' + i + '"]');
            if (optionEle.prop('checked')){
              optionVal += this.consultingOption[parseInt(optionEle.val() as string, 10)];
              optionVal += '/';
            }
          }
          console.log(optionVal);
          if (this.checkApplicationValidation(f)){
            let applicationVal = '';
            for (let i = 0 ; i < 5; i++){
              const applicationEle = $('input[name="application' + i + '"]');
              if (applicationEle.prop('checked')){
                applicationVal += this.application[parseInt(applicationEle.val() as string, 10)];
                if (f.value.application4) {
                  applicationVal += ('(' + f.value.description + ')');
                }
                applicationVal += '/';
              }
            }
            console.log(applicationVal);
            if (f.value.name && f.value.age && f.value.gender && f.value.phone) {
              if (f.value.hope_reason){
                if (f.value.application_reason && f.value.note && f.value.check && f.value.account && this.clickedDate !== '' && f.value.time) {
                  isValid = true;
                  const body = new Consulting(
                    f.value.name + f.value.age + f.value.gender + f.value.phone,
                    f.value.name,
                    f.value.age,
                    f.value.gender,
                    f.value.phone,
                    scores,
                    f.value.average,
                    optionVal,
                    applicationVal,
                    f.value.application_reason,
                    hope,
                    f.value.hope_reason,
                    f.value.note,
                    f.value.check ? 1 : 0,
                    f.value.account,
                    [{
                      id: '',
                      date: this.clickedDate + ' ' + f.value.time,
                      contents: ''
                    }]
                  );

                  console.log(body);

                  this.http.post<HttpResponse>(environment.apiUrl + '/api/consulting/create', body)
                    .subscribe(
                      (val) => {
                        console.log(val.message);
                        if (val.message === 'success') {
                          alert('컨설팅이 성공적으로 신청되었습니다. 입금 확인 후 진행되는 개별 연락을 기다려 주세요.');
                          location.reload();
                        } else {
                          alert('컨설팅 신청에 실패했습니다. 서버가 점검 중이니 관리자에게 문의해주세요.');
                        }
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
    }
    if (!isValid){
      alert('필수 항목을 모두 채워주세요');
    }
  }

  onHideTextField(): void{
    this.showTextField = false;
  }

  createCalender(): void{
    const firstDate = new Date(this.calenderYear, this.calenderMonth - 1, 1);
    const lastDate = new Date(this.calenderYear, this.calenderMonth, 0);
    const firstDay = this.weekDay[firstDate.getDay()];
    let weekCnt = 0;
    let week = [];

    for (let i = 0 ; i < firstDate.getDay(); i++){
      week.push(['', [], false]);
      weekCnt += 1;
      if (weekCnt === 7){
        this.calender.push(week);
        weekCnt = 0;
        week = [];
      }
    }

    for (let i = 1; i <= lastDate.getDate(); i++){
      if (this.consultingDate){
        const possibleTimeList = this.findPossibleTime(i, this.calenderMonth);
        if (possibleTimeList.length !== 0){
          week.push([i, possibleTimeList, true]);
        }else{
          week.push([i, possibleTimeList, false]);
        }
      } else {
        week.push([i, [], false]);
      }
      weekCnt += 1;
      if (weekCnt === 7){
        this.calender.push(week);
        weekCnt = 0;
        week = [];
      }
    }
    if (weekCnt !== 0){
      while (true){
        if (weekCnt === 7){
          this.calender.push(week);
          break;
        }
        week.push(['', [], false]);
        weekCnt += 1;
      }
    }

    console.log(this.calender);
  }

  findPossibleTime(date: number, mon: number): string[]{
    const monthKeys = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // const jsonKey = monthKeys[mon - 1];
    const dataOfMon = this.consultingDate[mon];
    const possibleTimeList = [];
    if (dataOfMon) {
      if (dataOfMon[date.toString()]){
        const dataOfDate = dataOfMon[date.toString()];
        for (const dataOfTime of dataOfDate) {
          possibleTimeList.push(dataOfTime);
        }
      }
    }
    return possibleTimeList;
  }

  showTimeList(date: string | number | boolean | string[], timeList: string | number | boolean | string[]): void{
    this.calenderDate = date as number;
    this.clicked = true;
    this.clickedDate = this.calenderMonth + '월 ' + date + '일';
    this.clickedTimeList = timeList as string[];
  }

  moveCalender(direct: number): void{
    this.calenderMonth += direct;
    if (this.calenderMonth === 13){
      this.calenderYear += 1;
      this.calenderMonth = 1;
    }
    if (this.calenderMonth === 0){
      this.calenderYear -= 1;
      this.calenderMonth = 12;
    }
    this.calender = [];
    this.createCalender();
  }

}
