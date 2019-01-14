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
}
/*   getFolders(){
    //do GET here
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=displayFolders;
    xhttp.open("GET","folders");
    console.log("before sending GET to /folders")
    xhttp.send();

    function displayFolders(){
      if(xhttp.readyState==4 && xhttp.status==200){
        let folders = JSON.parse(xhttp.responseText);
        console.log(folders);
        //TODO: Compare owner to active user,
        //should only display folders belonging to them
        folders.forEach(function(folder, index){
            addFolderToList(folder);
        });
      }
    }

 function addFolderToList(toAdd: Folder){
    console.log(toAdd);

  }  
}

  addFolder(newFolder: Folder){
    //do PUT here
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=makeFolder;
    xhttp.open("PUT", "folders");
    console.log("before sending PUT to /folders")
    xhttp.send(JSON.stringify(newFolder));
    
    function makeFolder(){
      if(xhttp.readyState==4&&xhttp.status==200){
        window.location.reload(true);
      }
    }
  }
} */
