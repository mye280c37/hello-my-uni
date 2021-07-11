import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '../http-response';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  adminCode = [];
  isAuthentication = true;
  type0 = true;
  type1 = false;
  type2 = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  createAdminList(result: any): void{

  }

  onSubmit(f: NgForm): void{
    this.http.get<HttpResponse>('https://site.hellomyuni.com/api/admin1/code', {params: {key: f.value.admin}})
      .subscribe(
        (val) => {
          console.log(val.message);
          if (val.message === 'success'){
            this.isAuthentication = true;
          }
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('complete');
        }
      );
    console.log(f.value);
  }

  changeTable(type: number): void{
    switch (type) {
      case 0:
        this.type0 = true;
        this.type1 = false;
        this.type2 = false;
        break;
      case 1 :
        this.type0 = false;
        this.type1 = true;
        this.type2 = false;
        break;
      case 2:
        this.type0 = false;
        this.type1 = false;
        this.type2 = true;
    }
  }

}
