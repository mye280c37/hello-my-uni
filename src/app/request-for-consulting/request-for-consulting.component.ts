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
  showAnnouncement = false;

  title = '컨설팅 신청';
  consultingDate: any;
  showTextField = false;
  showTextField2 = false;
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
  route = [
    '센터 대학입시 설명회',
    '유튜브 채널',
    '지인 소개',
    '기타'
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

  checkValidation(f: NgForm): (boolean|string|null)[] {
    let valid = true;
    let msg = '필수 항목을 모두 채워주세요 ';
    const elements = [];
    if (!f.value.name){
      elements.push('이름');
      valid = false;
    }
    if (!f.value.age){
      elements.push('나이');
      valid = false;
    }
    if (!f.value.gender){
      elements.push('성별');
      valid = false;
    }
    if (!f.value.phone){
      elements.push('전화번호');
      valid = false;
    }
    if (!(f.value.option0 || f.value.option1 || f.value.option2)){
      elements.push('컨설팅 선택 옵션');
      valid = false;
    }
    if (!this.checkApplicationValidation(f)){
      elements.push('지원 전형');
      valid = false;
    }
    if (!(f.value.korean && f.value.english && f.value.math && f.value.society && f.value.history && f.value.choice)){
      elements.push('과목별 점수');
      valid = false;
    }
    if (!f.value.average){
      elements.push('평균 점수');
      valid = false;
    }
    if (!f.value.application_reason){
      elements.push('지원 전형 선택 이유');
      valid = false;
    }
    if (!(f.value.uni1 && f.value.major1 && f.value.uni2 && f.value.major2 && f.value.uni3 && f.value.major3
      && f.value.uni4 && f.value.major4 && f.value.uni5 && f.value.major5 && f.value.uni6 && f.value.major6)){
      elements.push('지망 학교 및 학과');
      valid = false;
    }
    if (!f.value.hope_reason){
      elements.push('학교 및 학과 선정 이유');
      valid = false;
    }
    if (!f.value.note){
      elements.push('참고 사항');
      valid = false;
    }
    if (this.clickedDate === '' || !f.value.time){
      elements.push('상담 시간');
      valid = false;
    }
    if (!f.value.fileSendCheck){
      elements.push('자기소개서 메일 전송 확인');
      valid = false;
    }
    if (!f.value.check){
      elements.push('컨설팅 비용 및 개인 정보 확인');
      valid = false;
    }
    if (!f.value.account){
      elements.push('환불 계좌');
      valid = false;
    }
    if (valid) {
      msg = '';
    } else{
      msg += '(';
      msg += elements.join(', ');
      msg += ')';
    }
    return [valid, msg];
  }


  // tslint:disable-next-line:typedef
  onSubmit(f: NgForm){
    const validationResult = this.checkValidation(f);
    const isValid = validationResult[0];
    let msg = validationResult[1];
    console.log(f.value);

    if (isValid){
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
      let optionVal = '';
      for (let i = 0; i < 4; i++){
        const optionEle = $('input[name="option' + i + '"]');
        if (optionEle.prop('checked')){
          optionVal += this.consultingOption[parseInt(optionEle.val() as string, 10)];
          optionVal += '/';
        }
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
        let route = '';
        if (f.value.route0 || f.value.route1 || f.value.route2 || f.value.route3 ){
          for (let i = 0; i <= 3; i++){
            if (f.value['route' + i]){
              route += this.route[i];
              route += '/';
            }
          }
          if (f.value.route3){
            route += ( '(' + f.value.description_route + ')' );
          }
        }
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
          f.value.exam2SubjectName,
          f.value.examMon6Result,
          f.value.fileSendCheck,
          f.value.account,
          route,
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
                setTimeout(() => alert('신청을 처리중입니다. 잠시만 기다려주세요.'), 1000);
                //this.showAnnouncement = true;
                setTimeout(() => alert('컨설팅이 성공적으로 신청되었습니다. 입금 확인 후 진행되는 개별 연락을 기다려 주세요.'), 3000);
              } else {
                alert('컨설팅 신청에 실패했습니다. 서버가 점검 중이니 관리자에게 문의해주세요.'); 
              }
            },
            err => {
              console.log(err);
              alert('컨설팅 신청에 실패했습니다. 서버가 점검 중이니 관리자에게 문의해주세요.'); 
            },
            () => {
              console.log('complete');
            }
          );
      }
    }else{
      alert(msg);
    }
  }

  controlTextField(inputName: string, targetVar: string): void{
    if ($('input[name=' + inputName + ']').prop('checked')) {
      if (targetVar === 'showTextField'){
        this.showTextField = true;
      }else{
        this.showTextField2 = true;
      }
    }else{
      if (targetVar === 'showTextField'){
        this.showTextField = false;
      }else{
        this.showTextField2 = false;
      }
    }
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
    let possibleTimeList = [];
    for (const eachConsultingDate of this.consultingDate){
      if (eachConsultingDate.month === mon.toString() && eachConsultingDate.date === date.toString()){
        possibleTimeList = eachConsultingDate.timeList;
        break;
      }
    }
    let filtered = possibleTimeList.filter((element: string) => element !== null);
    filtered = filtered.filter((element: string) => element !== "");
    filtered = filtered.filter((element: string) => element !== '');

    return filtered;
  }

  showTimeList(date: string | number | boolean | string[], timeList: string | number | boolean | string[]): void{
    this.calenderDate = date as number;
    this.clicked = true;
    this.clickedDate = this.calenderMonth + '월 ' + date + '일';
    this.clickedTimeList = timeList as string[];
    console.log(this.clickedTimeList);
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

  hideAnnouncement(): void{
    this.showAnnouncement = false;
  }
}
