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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<HttpResponse>(environment.apiUrl + '/api/consulting/date')
      .subscribe(
        (val) => {
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
