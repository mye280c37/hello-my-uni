import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '../../http-response';
import { ConsultingDate } from '../../../models/consulting-date.model';
import { environment } from '../../../environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-consulting-date',
  templateUrl: './consulting-date.component.html',
  styleUrls: ['./consulting-date.component.scss']
})
export class ConsultingDateComponent implements OnInit {
  consultingDateInfo: ConsultingDate[] = [];
  doAdd = false;
  addTimeNum = 1;

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<HttpResponse>(environment.apiUrl + '/api/consulting/date')
      .subscribe(
        (val) => {
          this.consultingDate = val.result;
          console.log(val.result);
          this.createConsultingDateInfo(val.result);
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('complete');
        }
      );
      this.createCalender();
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

  createConsultingDateInfo(result: any): void {
    for (const eachInfo of result) {
      const consultingDate = new ConsultingDate(
        eachInfo.month,
        eachInfo.date,
        eachInfo.timeList
      );
      this.consultingDateInfo.push(consultingDate);
    }
    // console.log(this.consultingDateInfo);
  }

  addTimeTextField(): void {
    this.addTimeNum += 1;
    $('#time-textfield')
      .append('<input type="text" class="form-control mb-2" name="time' + this.addTimeNum + '">');
  }

  onSubmit(f: NgForm): void{
    const timeList: string[] = [];

    for (let i = 1; i <= this.addTimeNum; i++){
      const inputName = 'time' + i;
      timeList.push($('input[name=time' + i + ']').val() as string);
    }

    const body = {
      month: f.value.month,
      date: f.value.date,
      timeList
    };

    console.log(body);

    this.http.post<HttpResponse>(environment.apiUrl + '/api/consulting/date/add', body)
      .subscribe(
        (val) => {
          if (val.message === 'success' ){
            alert('정보가 성공적으로 저장되었습니다.');
          }else{
            alert('정보 저장에 실패하였습니다. 관리자에게 문의바랍니다');
          }
        },
        (err) => {
          console.log(err);
          alert('정보 저장에 실패하였습니다. 관리자에게 문의바랍니다');
        }
      );
  }
}
