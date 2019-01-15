import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, pipe, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { File } from './file';

@Injectable({
  providedIn: 'root'
})
export class FileService {
    private appUrl =  'api/files';
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  getFiles(): Observable<File[]> {
      console.log(this.appUrl);
      return this.http.get(this.appUrl, {withCredentials: false}).pipe(
          map(resp => {
              console.log(resp);
              return resp as File[];
            })
      );
  }
  getFile(id: number): Observable<File> {
      const url: string = this.appUrl + '/' + id;
      return this.http.get(url, {withCredentials: false}).pipe(map(resp => resp as File));
  }
  updateFile(file: File): Observable<File> {
      const body = JSON.stringify(file);
      if (file.id) {
          const url = this.appUrl + '/' + file.id;
          return this.http.put(url, body,
             {headers: this.headers, withCredentials: false}).pipe(
              map(resp => resp as File)
          );
      } else {
          return this.http.post(this.appUrl, body,
             {headers: this.headers, withCredentials: false}).pipe(
              map(resp => resp as File)
          );
      }
  }
}
