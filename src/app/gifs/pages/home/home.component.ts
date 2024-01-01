import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-pages-home',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {


  constructor(private gifService:GifsService){

  }

  public getGifList():Gif[]{
    return this.gifService.gifList;
  }
}
