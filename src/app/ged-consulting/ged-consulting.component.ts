import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ged-consulting',
  templateUrl: './ged-consulting.component.html',
  styleUrls: ['./ged-consulting.component.scss']
})
export class GedConsultingComponent implements OnInit {
  title = '검정고시 출신자 맞춤 진학 컨설팅 안내';

  constructor() { }

  ngOnInit(): void {
  }

}
