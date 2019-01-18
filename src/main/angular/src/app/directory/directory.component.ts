import { Component, OnInit } from '@angular/core';
import {FolderService} from '../shared/folder.service';
import {Folder} from 'src/app/shared/folder';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/files/shared/file.service';
import { File } from 'src/app/files/shared/file';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  public folders: Folder[];
  public rootId: Number;
  public folder = new Folder;
  public files: File[];
  public file = new File;

  constructor(private folderService: FolderService, private router: Router, private fileService: FileService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.checkFolder();
  }

  checkFolder(){
    this.route.params.subscribe(params => {
      this.rootId = +params['folderId'];
      console.log("RootId:"+this.rootId);
      if(!(this.rootId > 0)){
        this.fetchRoot();
      }else{
        this.fetchFolderContents(this.rootId);
        this.fetchFileContents(this.rootId);
      }
   });
  }

  fetchRoot(){
    console.log("Initializing Directory")
    this.folderService.getRoot().subscribe(root => {
      this.rootId=root.id;
      this.fetchFolderContents(this.rootId);
      this.fetchFileContents(this.rootId);
    })
  }


  fetchFolderContents(rf: Number){
    this.folderService.getFolderContent(rf).subscribe(folders => {
      this.folders=folders;
      console.log("Folder contents:");
      console.log(this.folders);
    })
  }
  fetchFileContents(rf: Number){
    this.fileService.getFilesByFolder(rf).subscribe(files => {
      this.files=files;
      console.log("File contents:");
      console.log(this.files);
    })
  }


  removeFolder(id:number){
    console.log("Called delete on folder");
    this.folderService.deleteFolder(id).subscribe();
    this.folders= this.folders.filter(f => f.id !== id);
    //window.location.reload();
  }
  removeFile(id:number){
    console.log("Called delete on file");
    this.fileService.deleteFile(id).subscribe();
    this.files= this.files.filter(fi => fi.id !== id);
    //window.location.reload();
  }

  enterFolder(id:number){
    console.log("Entering folder " + id);
    this.router.navigate(['/home/folder/'+id]);
  }
}
