import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-ged-conversion',
  templateUrl: './ged-conversion.component.html',
  styleUrls: ['./ged-conversion.component.scss']
})
export class GedConversionComponent implements OnInit {
  // data: object;
  renewal: boolean = false;
  result: boolean = false;


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void{
    console.log(f.value);

    f.value["status"] = "0";

    console.log(f.value);

    if(this.renewal){
      this.http.get('http://localhost:5000/api/converter/each_converter', {params: f.value})
        .subscribe(
          (val) => {
            console.log(val);
          },
          err => {
            console.log(err);
          },
          () => {
            console.log("complete");
          }
        );
    }else{
      alert('서버 리뉴얼 중입니다. 4월 중 재개 예정입니다.');
    }
  }

}
