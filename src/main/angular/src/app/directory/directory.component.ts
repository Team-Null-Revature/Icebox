import { Component, OnInit } from '@angular/core';
import {FolderService} from '../shared/folder.service';
import {Folder} from 'src/app/shared/folder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  public folders: Folder[];
  public folder = new Folder;

  constructor(private folderService: FolderService, private router: Router) { }

  ngOnInit() {
    console.log("Initializing Directory")
    this.folderService.getFolders().subscribe(folders => {
      this.folders=folders;
      console.log(this.folders);
    });
  }
  removeFolder(id:number){
    console.log("Called delete on folder");
    this.folderService.deleteFolder(id).subscribe();
    this.folders= this.folders.filter(f => f.folder_id !== id);
    window.location.reload();
  }
}
