import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-essay-consulting',
  templateUrl: './essay-consulting.component.html',
  styleUrls: ['./essay-consulting.component.scss']
})
export class EssayConsultingComponent implements OnInit {
  title = '논술 컨설팅';
  loadPosts = true;

  constructor() { }

  ngOnInit(): void {
  }

}
