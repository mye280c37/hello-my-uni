import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ConsultingReqInfoService } from './consulting-req-info.service';
import { Consulting } from '../../../models/consulting.model';
import { ConsultingTable } from './consulting-req-info.model';

@Component({
  selector: 'app-consulting-req-info',
  templateUrl: './consulting-req-info.component.html',
  styleUrls: ['./consulting-req-info.component.scss']
})
export class ConsultingReqInfoComponent implements OnInit {
  doesPay = false;
  mss = '미입금';
  tableNumber: number[] = [];
  consultingTableList: ConsultingTable[] = [];
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
    this.http.get<ConsultingReqInfoService>('http://localhost:4000/api/consulting/board')
      .subscribe(
        (val) => {
          console.log(val.result);
          this.createResultList(val.result);
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('complete');
        }
      );
  }

  changeState(): void{
    this.doesPay = !this.doesPay;
    if (this.doesPay){
      this.mss = '입금';
      alert('email로 입금확인 메일 보낼까?');
    }else{
      this.mss = '미입금';
    }
  }

  createResultList(result: any): void{
    let tableId = 1;
    let eleNum = 0;
    let consultingTable = [];
    for (let i = 0; i < result.length; i++){
      const consulting = new Consulting(
        result[i].key,
        result[i].name,
        result[i].age,
        result[i].gender,
        result[i].scores,
        result[i].average,
        result[i].option,
        result[i].application,
        result[i].description,
        result[i].application_reason,
        result[i].hope,
        result[i].note,
        result[i].date_time,
        result[i].check,
        result[i].account,
        result[i].comment,
        result[i].payment
      );
      consultingTable.push(consulting);
      eleNum += 1;
      if (eleNum === 10 || i === result.length - 1){
        this.consultingTableList.push(
          new ConsultingTable(
            tableId,
            consultingTable
          )
        );
        console.log(this.consultingTableList);
        tableId += 1;
        consultingTable = [];
      }
    }
  }

  changeStrToInt(str: string): number{
    return parseInt(str);
  }
}
