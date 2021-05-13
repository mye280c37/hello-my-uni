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
  type0 = true;
  type1 = false;

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

  changeTable(type: number){
    switch (type) {
      case 0:
        this.type0 = true;
        this.type1 = false;
        break;
      case 1 :
        this.type0 = false;
        this.type1 = true;
        break;
    }
  }

}
