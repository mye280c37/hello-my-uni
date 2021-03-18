import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuCollapsed = false;
  @Input() isopen = false;

  constructor() { }

  ngOnInit(): void {
  }

}
