import { Component, Input } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(private gifsService:GifsService){

  }

  public getTagsHistory():string[]{
    return this.gifsService.tagsHistory
  }

  public searchTag(tag:string):void{
    this.gifsService.searchTag(tag)
  }
}
