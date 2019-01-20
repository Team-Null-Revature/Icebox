import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getComments(id: Number): Observable<Comment[]>{
    return this.http.get('api/comments/'+id).pipe(map(resp => resp as Comment[]));
  }

  addComment(id:Number, c:Comment): Observable<Comment>{
    return this.http.post('api/comments/'+id, c).pipe(map(resp => resp as Comment));
  }
}
