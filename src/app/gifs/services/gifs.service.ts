import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifList: Gif[] = []

  private _tagsHistory: string[] = JSON.parse(localStorage.getItem('history')!) || [];
  private apiKey: string = 'SgVM4iVZ6E5evj3o1KpFaEmCPo4sddtp';

  constructor(private http: HttpClient) {}

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLocaleLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldtag) => oldtag !== tag);
    }
    if (this.tagsHistory.length >= 10) {
      this._tagsHistory.pop();
      this._tagsHistory.unshift(tag);
    } else {
      this._tagsHistory.unshift(tag);
    }
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history',JSON.stringify(this._tagsHistory))
  }

  public searchTag(tag: string): void {
    if (tag === '') return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`https://api.giphy.com/v1/gifs/search`, { params })
      .subscribe((data) => {
        this.gifList = data.data;

      });
  }
}
