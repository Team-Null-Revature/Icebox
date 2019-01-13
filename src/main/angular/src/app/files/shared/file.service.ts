import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, pipe, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { File } from './file';
import { UrlService } from 'src/app/url.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
    private appUrl = this.url.getUrl();
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient, private url: UrlService) { }

  getFiles(): Observable<File[]> {
      return this.http.get(this.appUrl).pipe(
          map(resp => resp as File[])
      );
  }
  getFile(id: number): Observable<File> {
      const url: string = this.appUrl + '/' + id;
      return this.http.get(url).pipe(map(resp => resp as File));
  }
  updateFile(file: File): Observable<File> {
      const body = JSON.stringify(file);
      if (file.id) {
          const url = this.appUrl + '/' + file.id;
          return this.http.put(url, body, {headers: this.headers}).pipe(
              map(resp => resp as File)
          );
      } else {
          return this.http.post(this.appUrl, body, {headers: this.headers}).pipe(
              map(resp => resp as File)
          );
      }
  }
}
