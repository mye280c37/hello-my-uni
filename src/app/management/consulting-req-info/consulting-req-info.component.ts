import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '../../http-response';
import { Comment, Consulting } from '../../../models/consulting.model';
import { ConsultingTable } from './consulting-req-info.model';
import { NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment';

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
    this.getConsultingInfo();
  }

  getConsultingInfo(): void{
    this.http.get<HttpResponse>(environment.apiUrl + '/api/consulting/board')
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
      const comments = [];
      for ( const comment of result[i].comments ){
        comments.push(
          new Comment(
            comment._id,
            comment.date,
            comment.contents
          )
        );
      }
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
        result[i].application_reason,
        result[i].hope,
        result[i].hope_reason,
        result[i].note,
        result[i].check,
        result[i].exam2SubjectName,
        result[i].examMon6Result,
        result[i].fileSendCheck,
        result[i].account,
        result[i].route,
        comments
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

  tabTable(i: number): void{
    this.tableTab = i;
  }

  showAddCommentBox(id: string, comments: Comment[]): void{
    if (comments.length === 0 || comments[0].contents !== ''){
      $('#add-comment-box-' + id).removeClass('hidden');
    }
  }

  hideAddCommentBox(id: string): void{
    $('#add-comment-box-' + id).addClass('hidden');
  }

  onSubmit(id: string, dateTime= '', commentId = ''): void{
    let body;
    if (dateTime === '') {
      const month = $('input#month' + id).val();
      const date = $('input#date' + id).val();
      const contents = $('textarea#comment' + id).val();
      body = {
        id,
        date: (month && date) ? month + '월' + date + '일' : '',
        contents: contents ? contents : '',
        commentId: ''
      };
    }else{
      body = {
        id,
        date: dateTime,
        contents: $('textarea#' + id + '-only-comment').val(),
        commentId
      };
    }
    console.log(body);
    this.http.post( environment.apiUrl + '/api/consulting/update', body)
      .subscribe(
        (val) => {
          console.log(val);
          alert('변경이 완료되었습니다');
          this.tableNumber = [];
          this.consultingTableList = [];
          this.getConsultingInfo();
        },
        err => {
          console.log(err);
          console.log(err.status);
          if (err.status === 404) {
            alert('변경에 실패하였습니다. 관리자에게 문의 바랍니다.');
          }
        },
        () => {
          console.log('complete');
        }
      );
  }

  changeToField(commentId: string): void{
    $('#' + commentId + '-contents').addClass('hidden');
    $('#' + commentId + '-contents-field').removeClass('hidden');
  }

  updateComment(f: NgForm, id: string, commentId: string): void{
    console.log(f.value.contents);
    this.http.post(environment.apiUrl + '/api/comment/update', {commentId, id, contents: f.value.contents})
      .subscribe(
        (val) => {
          alert('성공적으로 변경되었습니다.');
          this.tableNumber = [];
          this.consultingTableList = [];
          this.getConsultingInfo();
        },
        (err) => {
          console.log(err);
          alert('변경에 실패하였습니다. 관리자에게 문의바랍니다.');
        }
      );
  }


  deleteComment(id: string, commentId: string): void{
    this.http.post(environment.apiUrl + '/api/comment/delete',
      {
        id,
        commentId
      })
      .subscribe(
        (val) => {
          alert('성공적으로 삭제되었습니다');
          this.tableNumber = [];
          this.consultingTableList = [];
          this.getConsultingInfo();
        },
        (err) => {
          console.log(err);
          alert('삭제에 실패하였습니다. 관리자에게 문의바랍니다.');
        }
      );
  }
}
