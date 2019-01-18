import { Component, OnInit } from '@angular/core';
import {FolderService} from '../shared/folder.service';
import {Folder} from 'src/app/shared/folder';
import { Router } from '@angular/router';
import { FileService } from 'src/app/files/shared/file.service';
import { File } from 'src/app/files/shared/file';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  public folders: Folder[];
  public folder = new Folder;
  public files: File[];
  public file = new File;

  constructor(private folderService: FolderService, private router: Router, private fileService: FileService) { }

  ngOnInit() {
    //get all folders
    console.log("Initializing Directory")
    this.folderService.getFolders().subscribe(folders => {
      this.folders=folders;
      console.log(this.folders);
    })
    //get all files
    this.fileService.getFiles().subscribe(files => {
      this.files=files;
      console.log(this.files);
    });
  }
  removeFolder(id:number){
    console.log("Called delete on folder");
    this.folderService.deleteFolder(id).subscribe();
    this.folders= this.folders.filter(f => f.folder_id !== id);
    //window.location.reload();
  }
  removeFile(id:number){
    console.log("Called delete on file");
    this.fileService.deleteFile(id).subscribe();
    this.files= this.files.filter(fi => fi.id !== id);
    //window.location.reload();
  }
}
