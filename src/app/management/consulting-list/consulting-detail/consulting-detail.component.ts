import * as $ from 'jquery';
import {Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '../../../http-response';
import { Comment, Consulting } from '../../../../models/consulting.model';
import { ConsultingDetail } from './consulting-detail.model';
import { NgForm } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-consulting-detail',
  templateUrl: './consulting-detail.component.html',
  styleUrls: ['./consulting-detail.component.scss']
})
export class ConsultingDetailComponent implements OnInit {
  @Input() consultingDetail: ConsultingDetail[] = [];
  @Input() consultingDetailTableId: number[] = [];
  tableNumber: number[] = [];
  tableTab = 1;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  tabTable(i: number): void{
    this.tableTab = i;
  }

  showAddCommentBox(id: string, comments: Comment[]): void{
    if (comments.length === 0 || comments[0].contents !== ''){
      $('#add-comment-box-' + id).removeClass('hidden');
    }
  }

  setConsultingDetail(result: any): void{
    this.consultingDetail = [];
    this.consultingDetailTableId = [];
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

  reLoadConsultingDetail(key: string): void{
    this.consultingDetail = [];
    this.consultingDetailTableId = [];
    this.http.post<HttpResponse>(environment.apiUrl + '/api/consulting/read', {key})
      .subscribe(
        (val) => {
          this.setConsultingDetail(val.result);
        },
        (err) => {
          console.log(err);
          alert('서버 오류 발생. 관리자에게 문의 바랍니다.');
        }
      );
  }

  hideAddCommentBox(id: string): void{
    $('#add-comment-box-' + id).addClass('hidden');
  }

  onSubmit(id: string, key: string, dateTime= '', commentId = ''): void{
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
    this.http.post<HttpResponse>( environment.apiUrl + '/api/consulting/update', body)
      .subscribe(
        (val) => {
          console.log(val);
          if (val.message === 'success'){
            alert('변경이 완료되었습니다');
            this.reLoadConsultingDetail(key);
          }else {
            alert('변경에 실패하였습니다. 관리자에게 문의 바랍니다.');
          }
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

  updateComment(f: NgForm, id: string, commentId: string, key: string): void{
    console.log(f.value.contents);
    this.http.post<HttpResponse>(environment.apiUrl + '/api/comment/update', {commentId, id, contents: f.value.contents})
      .subscribe(
        (val) => {
          if (val.message === 'success'){
            alert('성공적으로 변경되었습니다.');
            this.reLoadConsultingDetail(key);
          } else{
            alert('변경에 실패하였습니다. 관리자에게 문의바랍니다.');
          }
        },
        (err) => {
          console.log(err);
          alert('변경에 실패하였습니다. 관리자에게 문의바랍니다.');
        }
      );
  }


  deleteComment(id: string, commentId: string, key: string): void{
    this.http.post<HttpResponse>(environment.apiUrl + '/api/comment/delete',
      {
        id,
        commentId
      })
      .subscribe(
        (val) => {
          if (val.message === 'success'){
            alert('성공적으로 삭제되었습니다');
            this.reLoadConsultingDetail(key);
          } else {
            alert('삭제에 실패하였습니다. 관리자에게 문의바랍니다.');
          }
        },
        (err) => {
          console.log(err);
          alert('삭제에 실패하였습니다. 관리자에게 문의바랍니다.');
        }
      );
  }
}
