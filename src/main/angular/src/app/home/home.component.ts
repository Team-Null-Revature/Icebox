import { Component, OnInit } from '@angular/core';
import { File } from '../shared/models/file.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from '../shared/services/file.service';
import { FolderService } from '../shared/services/folder.service';
import { Folder } from '../shared/models/folder.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fileId: number;
  folderId: number;
  searchStr: string;
  selectedFile: File;
  uploadedFile: File;
  createdFolder: Folder;

  constructor(private router: Router, private fis: FileService, private fos: FolderService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let redirect = false;
      const fileId = +params.get('fileId');
      const folderId = +params.get('folderId');
      const searchStr = params.get('searchStr');

      // check if this is a search query
      if (searchStr) {
        this.searchStr = searchStr;
      } else {
        // Check if the fileId is undefined
        if (!fileId) {
          // It is, set it to zero
          this.fileId = 0;
          redirect = true;
        } else {
          // Its not, set it to the paths
          this.fileId = fileId;

          // Dont load a file we already have
          if (!this.selectedFile || this.selectedFile.id !== this.fileId) {
            this.fis.getFile(this.fileId).subscribe(f => (this.selectedFile = f));
          }
        }

        // Check if the folderId is unefined
        if (!folderId) {
          // It is, get the root folder
          redirect = false;
          this.fos.getRoot().subscribe(root => {
            this.router.navigate([`/home/folder/${root.id}/file/${this.fileId}`]);
          });
        } else {
          // Its not, set it to the paths
          this.folderId = folderId;
        }

        // Redirect
        if (redirect) {
          this.router.navigate([`/home/folder/${this.folderId}/file/${this.fileId}`]);
        }
      }

      if (params.get('sharestr')) {
        this.fis.getShareFile(params.get('sharestr')).subscribe(f => (this.selectedFile = f));
      }
    });
  }

  // Set the file that was selected as the selected file
  onFileSelected(file: File) {
    this.selectedFile = file;
    // Change the URL to reflect the selected file
    this.router.navigate([`/home/folder/${file.folder.id}/file/${file.id}`]);
  }

  // File has been uploaded to the current folder
  onFileUploaded(file: File) {
    this.uploadedFile = file;
  }

  // Folder has been created in the current folder
  onFolderCreated(folder: Folder) {
    this.createdFolder = folder;
  }
}
