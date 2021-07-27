import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '../../http-response';
import { Comment, Consulting } from '../../../models/consulting.model';
import { NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { ConsultingTableElement, ConsultingDetail } from './consulting-list.model';

@Component({
  selector: 'app-consulting-list',
  templateUrl: './consulting-list.component.html',
  styleUrls: ['./consulting-list.component.scss']
})
export class ConsultingListComponent implements OnInit {
  consultingKey = '';
  consultingDetail: ConsultingDetail[] = [];
  consultingDetailTableId: number[] = [];
  consultingList: ConsultingTableElement[] = [];
  sideBar = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<HttpResponse>(environment.apiUrl + '/api/consulting/board')
      .subscribe(
        (val) => {
          console.log(val.result);
          this.createResultList(val.result);
        },
        (err) => {
          console.log(err);
          alert('서버 오류 발생. 관리자에게 문의 바랍니다.');
        },
        () => {
          console.log('complete');
        }
      );
  }

  isKey(key: string): boolean{
    for (const consultingInfo of this.consultingList){
      if (consultingInfo.key === key) { return true; }
    }
    return false;
  }

  createResultList(result: any): void{
    for (const consulting of result){
      if (! this.isKey(consulting.key)){
        this.consultingList.push(consulting);
      }
    }
  }

  setConsultingDetail(result: any): void{
    this.consultingDetail = [];
    this.consultingDetailTableId = [];
    this.sideBar = false;
    for (const aResult of result) {
      const comments: Comment[] = [];
      for (const aComment of aResult.comments){
        comments.push(new Comment(
          aComment._id,
          aComment.date,
          aComment.contents
        ));
      }
      this.consultingDetail.push(new ConsultingDetail(
        aResult._id,
        new Consulting(
          aResult.key,
          aResult.name,
          aResult.age,
          aResult.gender,
          aResult.phone,
          aResult.scores,
          aResult.average,
          aResult.option,
          aResult.application,
          aResult.application_reason,
          aResult.hope,
          aResult.hope_reason,
          aResult.note,
          aResult.check,
          aResult.exam2SubjectName,
          aResult.examMon6Result,
          aResult.fileSendCheck,
          aResult.account,
          '',
          comments
        )
      ));
      console.log(this.consultingDetail);
    }
    for (let i = 1; i <= result.length; i++){
      this.consultingDetailTableId.push(i);
    }
  }

  readConsulting(consultingInfo: ConsultingTableElement): void{
    this.http.post<HttpResponse>(environment.apiUrl + '/api/consulting/read', {key: consultingInfo.key})
      .subscribe(
        (val) => {
          this.setConsultingDetail(val.result);
          this.consultingKey = consultingInfo.key;
        },
        (err) => {
          console.log(err);
          alert('서버 오류 발생. 관리자에게 문의 바랍니다.');
        }
      );
  }

}
