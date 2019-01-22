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
    const url: string = this.appUrl + '/file/' + file.id;
    console.log('url' + url);
    return this.http.post(url, tag).pipe(map(resp => resp as Tag));
  }

  deleteTag(tag: Tag, file: File){
    console.log('in tag service delete');
    console.log('tag: ' + tag.id);
    console.log('file: ' + file.id);
    const url: string = 'api/file/' + file.id + "/tag/" + tag.id;
      return this.http.delete(url);
  }
}
