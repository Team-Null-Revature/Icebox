import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { File } from '../shared/models/file.model';
import { Folder } from '../shared/models/folder.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from '../shared/services/file.service';
import { FolderService } from '../shared/services/folder.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  @Output() selectedFile = new EventEmitter<File>();
  public folders: Folder[];
  public rootId: Number;
  public folder: Folder;
  public files: File[];
  public file: File;
  public searchStr: String;

  constructor(
    private folderService: FolderService,
    private router: Router,
    private fileService: FileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    document.getElementById("renameFolderForm").style.visibility = "hidden";
    document.getElementById("renameFileForm").style.visibility ="hidden";
    this.folder = new Folder();
    this.file = new File();
    this.searchStr = '';
    this.checkFolder();
  }

  checkFolder() {
    this.route.params.subscribe(params => {
      if (params['searchStr'] != null) {
        console.log('Search found: ' + params['searchStr']);
        this.fetchSearchResults(params['searchStr']);
      } else {
        this.rootId = +params['folderId'];
        console.log('RootId: ' + this.rootId);
        if (!(this.rootId > 0)) {
          this.fetchRoot();
        } else {
          this.fetchFolderContents(this.rootId);
          this.fetchFileContents(this.rootId);
        }
      }
    });
  }

  fetchRoot() {
    console.log('Initializing Directory');
    this.folderService.getRoot().subscribe(root => {
      this.rootId = root.id;
      this.fetchFolderContents(this.rootId);
      this.fetchFileContents(this.rootId);
    });
  }

  fetchFolderContents(rf: Number) {
    this.folderService.getFolderContent(rf).subscribe(folders => {
      this.folders = folders;
      console.log('Folder contents:');
      console.log(this.folders);
    });
  }
  fetchFileContents(rf: Number) {
    this.fileService.getFilesByFolder(rf).subscribe(files => {
      this.files = files;
      console.log('File contents:');
      console.log(this.files);
    });
  }

  removeFolder(id: number) {
    console.log('Called delete on folder');
    this.folderService.deleteFolder(id).subscribe();
    this.folders = this.folders.filter(f => f.id !== id);
    // window.location.reload();
  }

  fetchSearchResults(s: String) {
    this.fileService.getSearch(s).subscribe(files => {
      this.files = files;
    });
  }

  removeFile(id: number) {
    console.log('Called delete on file');
    this.fileService.deleteFile(id).subscribe();

    this.files = this.files.filter(fi => fi.id !== id);
  }

  enterFolder(id: number) {
    console.log('Entering folder ' + id);
    this.router.navigate(['/home/folder/' + id]);
  }

  reload() {
    window.location.reload();
  }

  selectFile(file: File) {
    this.selectedFile.emit(file);
    console.log('Select File');
    console.log(file);
  }

  newFolderName(folder: Folder){
    console.log("Received: ");
    this.folder = folder;
    console.log(folder);
    document.getElementById("renameFolderForm").style.visibility = "visible";
  }
  renameFolder(folder: Folder){
    document.getElementById("renameFolderForm").style.visibility = "hidden";
    console.log("Rename called on Folder: ");
    console.log(folder);
    this.folderService.editFolder(folder).subscribe(resp => {
      console.log(resp);
    });
  }
  
  newFileName(file: File){
    console.log("Received: ");
    this.file = file;
    console.log(file);
    document.getElementById("renameFileForm").style.visibility = "visible";
  }
  renameFile(file: File){
    document.getElementById("renameFileForm").style.visibility = "hidden";
    console.log("Rename called on File: ")
    console.log(file);
    this.fileService.editFile(file).subscribe(resp =>{
      console.log(resp);
    })
  }
}
