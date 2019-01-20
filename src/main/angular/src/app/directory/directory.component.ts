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

  enterFile(foid: number, fiid: number) {
    console.log('Entering file ' + fiid);
    this.router.navigate(['/home/folder/' + foid + '/file/' + fiid]);
    this.reload();
  }

  reload() {
    window.location.reload();
  }

  selectFile(file: File) {
    this.selectedFile.emit(file);
    console.log('Select File');
    console.log(file);
  }
}
