import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UniversityInfoService } from './university-info.service';
import { University } from '../../../models/university.model';
import { UniversityInfoTable } from './university-info.model';

@Component({
  selector: 'app-university-info',
  templateUrl: './university-info.component.html',
  styleUrls: ['./university-info.component.scss']
})
export class UniversityInfoComponent implements OnInit {

  uniInfoTables: UniversityInfoTable[] = [];
  tableIdList: number[] = [];
  currentId = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<UniversityInfoService>('https://site.hellomyuni.com/api/university/board')
      .subscribe(
        (val) => {
          this.createTable(val.result);
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('complete');
        }
      );
  }

  createTable(result: any): void{
    let uniInfoList: [string, University][] = [];
    let id = 1;
    let cellCnt = 0;
    for (const aResult of result){
      const aUni = new University(
        aResult.university,
        aResult.area,
        aResult.type,
        aResult.weight,
        aResult.standard,
        aResult.result,
        aResult.func,
        aResult.link
      );
      uniInfoList.push([aResult._id, aUni]);
      cellCnt += 1;
      if (cellCnt === 10){
        this.tableIdList.push(id);
        this.uniInfoTables.push(new UniversityInfoTable(
          id,
          uniInfoList
        ));
        id += 1;
        uniInfoList = [];
        cellCnt = 0;
      }
    }
    if (cellCnt !== 0){
      this.tableIdList.push(id);
      this.uniInfoTables.push(new UniversityInfoTable(
        id,
        uniInfoList
      ));
    }
    console.log(this.uniInfoTables);
  }

  tabTable(i: number): void{
    this.currentId = i;
  }

}
