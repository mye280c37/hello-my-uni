import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulting-req-info',
  templateUrl: './consulting-req-info.component.html',
  styleUrls: ['./consulting-req-info.component.scss']
})
export class ConsultingReqInfoComponent implements OnInit {
  doesPay = false;
  mss = '미입금';

  constructor() { }

  ngOnInit(): void {
  }

  changeState(){
    this.doesPay = !this.doesPay;
    if (this.doesPay){
      this.mss = '입금';
      alert('email로 입금확인 메일 보낼까?');
    }else{
      this.mss = '미입금';
    }
  }

}
