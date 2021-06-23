import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { AdminCodeService } from './management.service';


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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  createAdminList(result: any): void{

  }

  onSubmit(f: NgForm): void{
    this.http.get<AdminCodeService>('https://site.hellomyuni.com/api/admin1/code', {params: {key: f.value.admin}})
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
        break;
      case 1 :
        this.type0 = false;
        this.type1 = true;
        break;
    }
  }

}
