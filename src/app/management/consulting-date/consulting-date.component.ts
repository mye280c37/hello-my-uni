import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '../../http-response';
import { DateTimeInfo, MonDateTimeInfo } from './consulting-date.model';
import { environment } from '../../../environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-consulting-date',
  templateUrl: './consulting-date.component.html',
  styleUrls: ['./consulting-date.component.scss']
})
export class ConsultingDateComponent implements OnInit {
  consultingDateInfo: MonDateTimeInfo[] = [];
  doAdd = false;
  addTimeNum = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<HttpResponse>(environment.apiUrl + '/api/consulting/date')
      .subscribe(
        (val) => {
          console.log(val.result);
          this.createConsultingDateInfo(val.result);
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('complete');
        }
      );
  }

  createConsultingDateInfo(result: any): void {
    Object.keys(result)
      .forEach(k => {
        console.log(result[k]);
        const monDateTimeInfo = new MonDateTimeInfo(
          k, []
        );
        Object.keys(result[k])
          .forEach(date => {
            const dateTimeInfo = new DateTimeInfo(date, result[k][date]);
            monDateTimeInfo.dateTimeList.push(dateTimeInfo);
          });
        this.consultingDateInfo.push(monDateTimeInfo);
      });
    console.log(this.consultingDateInfo);
  }

  onSubmit(f: NgForm): void{

  }
}
