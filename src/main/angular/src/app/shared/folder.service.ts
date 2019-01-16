import { Injectable } from '@angular/core';
import { User } from './user';
import { Folder } from './folder';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private folder: Folder;
  constructor(private http: HttpClient) { }

  //Get all folders in DB
  getFolders(): Observable<Folder[]>{
    return this.http.get('api/folders').pipe(
      map(resp => resp as Folder[])
    );
  }
  //Add a new folder to the DB
  addFolder(folder : Folder){
      console.log(folder);
    return this.http.post('api/folders', folder).pipe(
      map(resp=> resp as Folder)
    );
  }
  //Delete a folder from the DB
  deleteFolder(id:number){
    console.log("Deleting folder with ID "+id);
    return this.http.delete('api/folders/'+id);
  }
}

