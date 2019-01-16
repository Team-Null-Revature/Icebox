import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { File } from '../shared/file';  
import { Tag } from '../shared/tag';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TagService { 

  constructor(private http: HttpClient) { }

  //add tag to DB
  addTag(tag : Tag){
    console.log(tag); 
    return this.http.post('api/tag', tag).pipe(
      map(resp => resp as Tag)
    );
  }
}
