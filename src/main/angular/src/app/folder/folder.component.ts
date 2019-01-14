import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Folder} from 'src/app/folder';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  private appUrl = this.appUrl.getURL()+'/folders';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  public folders: Folder[];

  //Needs user, so add a user service too
  constructor(private http: HttpClient) { }

  getFolders(): Observable<Folder[]>{
    return this.http.get(this.appUrl, {withCredentials: true}).pipe(
      map(resp => resp as Folder[])
    )
  }

  addFolder(newFolder: Folder){
    const body = JSON.stringify(newFolder);
    //If a folder with this id exists, edit instead
    //needs work, like writing update folder
    if(newFolder.folder_id){
      return this.http.post(this.appUrl, body,
        {headers: this.headers, withCredentials: true}).pipe(
          map(resp=>resp as Folder));
    } else{
      //Make sure to create all new folders with no id
      //to not be caught by the if
      return this.http.put(this.appUrl, body,
        {headers: this.headers, withCredentials: true}).pipe(
          map(resp => resp as Folder)
        );
    }
  }

  ngOnInit() {
    this.getFolders().subscribe(
      folders=>this.folders=folders
      );
    }

}
