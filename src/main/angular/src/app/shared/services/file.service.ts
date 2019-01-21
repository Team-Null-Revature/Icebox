import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { File as FileCustom } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private appUrl: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.appUrl = 'api/files';
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getFiles(): Observable<FileCustom[]> {
    return this.http.get(this.appUrl, { withCredentials: false }).pipe(map(resp => resp as FileCustom[]));
  }
  getFile(id: number): Observable<FileCustom> {
    const url: string = this.appUrl + '/' + id;
    return this.http.get(url, { withCredentials: false }).pipe(map(resp => resp as FileCustom));
  }
  getShareFile(sharestr: string): Observable<FileCustom> {
    const url: string = this.appUrl + '/shared/' + sharestr;
    return this.http.get(url, { withCredentials: false }).pipe(map(resp => resp as FileCustom));
  }
  getAllShared(): Observable<FileCustom[]> {
    const url: string = this.appUrl + '/shared';
    return this.http.get(url, { withCredentials: false }).pipe(map(resp => resp as FileCustom[]));
  }
  updateFile(file: FileCustom): Observable<FileCustom> {
    const body = JSON.stringify(file);
    if (file.id) {
      const url = this.appUrl + '/' + file.id;
      return this.http.put(url, body, { headers: this.headers, withCredentials: false }).pipe(map(resp => resp as FileCustom));
    } else {
      return this.http.post(this.appUrl, body, { headers: this.headers, withCredentials: false }).pipe(map(resp => resp as FileCustom));
    }
  }

  getFilesByFolder(fId: Number): Observable<FileCustom[]> {
    return this.http.get('api/files/folder=' + fId).pipe(
        map(resp => resp as FileCustom[])
      );
    }

  // Remove a file from the DB
  deleteFile(id: number) {
    console.log('Deleting file with ID ' + id);
    return this.http.delete('api/files/' + id);
  }

  shareFile(file: FileCustom): Observable<FileCustom> {
    const body = JSON.stringify(file);
    const url = this.appUrl + '/share';
    return this.http.put(url, body, { headers: this.headers, withCredentials: false }).pipe(map(resp => resp as FileCustom));
  }

  // get all files from search
  getSearch(s: String): Observable<FileCustom[]> {
    return this.http.get('api/files/search/' + s).pipe(
        map(resp => resp as FileCustom[])
      );
  }
}
