import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  adminCode = 'admin';
  isAuthentication = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    console.log(f.value);
    if(f.value["admin"] == this.adminCode){
      console.log("인증 완료");
      this.isAuthentication = true;
    }
  }

}
