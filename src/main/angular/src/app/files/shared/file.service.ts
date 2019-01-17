import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
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
      return this.http.get(this.appUrl, {withCredentials: false}).pipe(
          map(resp => resp as File[]));
  }
  getFile(id: number): Observable<File> {
      const url: string = this.appUrl + '/' + id;
      return this.http.get(url, {withCredentials: false}).pipe(map(resp => resp as File));
  }
  getShareFile(sharestr: string): Observable<File> {
    const url: string = this.appUrl + '/shared/' + sharestr;
      return this.http.get(url, {withCredentials: false}).pipe(map(resp => resp as File));
  }
  getAllShared(): Observable<File[]> {
    const url: string = this.appUrl + '/shared';
    return this.http.get(url, {withCredentials: false}).pipe(map(resp => resp as File[]));
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
  shareFile(file: File): Observable<File> {
      const body = JSON.stringify(file);
      const url = this.appUrl + '/share';
      return this.http.put(url, body,
             {headers: this.headers, withCredentials: false}).pipe(
              map(resp => resp as File)
             );
    }

    //Remove a file from the DB
deleteFile(id:number){
    console.log("Deleting file with ID "+id);
    return this.http.delete('api/files/'+id);
  }    
}
