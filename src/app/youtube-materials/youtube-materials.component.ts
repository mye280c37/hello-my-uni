import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import ClickEvent = JQuery.ClickEvent;


@Component({
  selector: 'app-youtube-materials',
  templateUrl: './youtube-materials.component.html',
  styleUrls: ['./youtube-materials.component.scss']
})
export class YoutubeMaterialsComponent implements OnInit {
  materialWidth = 720;
  materialHeight = 405;

  constructor() { }

  ngOnInit(): void {
  }

  changeMaterialState(targetId: string): void{
    const materialEle = $('#' + 'material' + targetId);
    const titleEle = $('#' + targetId);
    if (materialEle.hasClass('hidden')) {
      materialEle.removeClass('hidden');
      titleEle.addClass('font-weight-bold');
    }else{
      materialEle.addClass('hidden');
      if (titleEle.hasClass('font-weight-bold')) {
        titleEle.removeClass('font-weight-bold');
      }
    }
  }
}
