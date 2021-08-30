import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-description-list',
  templateUrl: './description-list.component.html',
  styleUrls: ['./description-list.component.scss']
})
export class DescriptionListComponent implements OnInit {
  loadDescriptions = false;

  constructor() { }

  ngOnInit(): void {
  }

}
