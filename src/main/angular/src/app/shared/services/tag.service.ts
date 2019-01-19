import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File } from '../models/file.model';
import { Tag } from '../models/tag.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private appUrl = 'api/tag';
  constructor(private http: HttpClient) {}

  // add tag to DB
  addTag(tag: Tag, file: File) {
    console.log('from tag.service.ts');
    console.log(tag);
    console.log(file.id);
    const url: string = this.appUrl + '/' + file.id;
    console.log('url' + url);
    return this.http.post(url, tag).pipe(map(resp => resp as Tag));
  }
}
