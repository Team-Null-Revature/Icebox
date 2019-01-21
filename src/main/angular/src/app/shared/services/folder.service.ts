import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Folder } from '../models/folder.model';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private folder: Folder;
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  // Get all folders in DB
  getFolders(): Observable<Folder[]> {
    return this.http.get('api/folders').pipe(map(resp => resp as Folder[]));
  }
  // Add a new folder to the DB
  addFolder(folder: Folder, id: Number) {
    console.log(folder);
    return this.http.post('api/folders/' + id, folder).pipe(map(resp => resp as Folder));
  }
  // Delete a folder from the DB
  deleteFolder(id: number) {
    console.log('Deleting folder with ID ' + id);
    return this.http.delete('api/folders/' + id);
  }
  // Get the root folder
  getRoot(): Observable<Folder> {
    return this.http.get('api/folders/root').pipe(map(resp => resp as Folder));
  }
  // Get all folders in current Folder
  getFolderContent(fl: Number): Observable<Folder[]> {
    return this.http.get('api/folder=' + fl).pipe(map(resp => resp as Folder[]));
  }
  //Change name of a folder in the DB
  editFolder(folder: Folder): Observable<Folder>{
    console.log("Updating folder..")
    console.log(folder);
    return this.http.post('api/folders/rename', folder).pipe(map(resp => resp as Folder));
  }
}
