import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-request-for-consulting',
  templateUrl: './request-for-consulting.component.html',
  styleUrls: ['./request-for-consulting.component.scss']
})
export class RequestForConsultingComponent implements OnInit {
  title = "상담 신청";
  showTextField = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    console.log(f.value);
  }

  onHideTextField(){
    this.showTextField = false;
  }
}
