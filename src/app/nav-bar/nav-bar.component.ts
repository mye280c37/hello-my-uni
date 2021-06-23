import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isMenuCollapsed = false;
  @Input() isopen = false;

  constructor() { }

  ngOnInit(): void {
    this.isMenuCollapsed = true;
  }

  alertMessage(): void{
    alert("곧 활성화 될 예정입니다. 일단 구글 폼을 이용해 상담신청을 진행해주세요!");
    location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSd0VlLOzNwJUSXdF5zMSMgVAiuZBWEiHI1gcRIjTbBkF5crMg/viewform';
  }

  changeState(){
    this.isopen = !this.isopen;
  }

}
