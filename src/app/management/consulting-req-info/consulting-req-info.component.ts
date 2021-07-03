import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ConsultingReqInfoService } from './consulting-req-info.service';
import { Consulting } from '../../../models/consulting.model';
import { ConsultingTable } from './consulting-req-info.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-consulting-req-info',
  templateUrl: './consulting-req-info.component.html',
  styleUrls: ['./consulting-req-info.component.scss']
})
export class ConsultingReqInfoComponent implements OnInit {
  doesPay = false;
  mss = '미입금';
  tableNumber: number[] = [];
  tableTab = 1;
  consultingTableList: ConsultingTable[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<ConsultingReqInfoService>('https://site.hellomyuni.com/api/consulting/board')
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

  isKey(key: string): boolean{
    for (const consultingTable of this.consultingTableList){
      if (consultingTable.key === key) { return true; }
    }
    return false;
  }

  getConsultingTable(key: string): ConsultingTable{
    let targetTable: ConsultingTable;
    for (const consultingTable of this.consultingTableList){
      if (consultingTable.key === key) {
        targetTable = consultingTable;
        return targetTable;
      }
    }
    return new ConsultingTable(0, '0', []);
  }

  createResultList(result: any): void{
    console.log(result);
    let tableId = 1;
    let eleNum = 0;
    for (let i = 0; i < result.length; i++){
      const consulting = new Consulting(
        result[i].key,
        result[i].name,
        result[i].age,
        result[i].gender,
        result[i].phone,
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
      const cellId = result[i].name + i;
      eleNum += 1;
      if (this.isKey(result[i].key)){
        const consultingTable = this.getConsultingTable(result[i].key);
        // @ts-ignore
        consultingTable.result.push([cellId, consulting, result[i]._id]);
      }else{
        this.consultingTableList.push(
          new ConsultingTable(
            tableId,
            result[i].key,
            [[cellId, consulting, result[i]._id]]
          )
        );
        this.tableNumber.push(tableId);
        tableId += 1;
      }
    }
    console.log(this.consultingTableList);
  }

  showAdditionalBox(id: string): void{
    const materialEle = $('#' + id + '-additional-box');
    const titleEle = $('#' + id);
    if (materialEle.hasClass('hidden')) {
      materialEle.removeClass('hidden');
      titleEle.addClass('font-weight-bold');
    }else{
      materialEle.addClass('hidden');
      if (titleEle.hasClass('font-weight-bold')) {
        titleEle.removeClass('font-weight-bold');
      }
    }
  }

  tabTable(i: number): void{
    this.tableTab = i;
  }

  onSubmit(id: string, payment: boolean): void{
    const body = {
      id,
      comment: $('textarea#comment' + id).val(),
      payment
    };
    console.log(body);
    this.http.post('https://site.hellomyuni.com/api/consulting/update', body)
      .subscribe(
        (val) => {
          console.log(val);
        },
        err => {
          console.log(err);
          console.log(err.status);
          if (err.status === 404){
            alert('변경에 실패하였습니다. 관리자에게 문의 바랍니다.');
          }
        },
        () => {
          console.log('complete');
          alert('변경이 완료되었습니다');
          location.reload();
        }
      );
  }
}
