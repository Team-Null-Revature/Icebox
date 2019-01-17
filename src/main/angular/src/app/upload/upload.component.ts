import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { UploadStatus } from '../shared/uploadStatus.model';
import { FileService } from '../files/shared/file.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Input() folderId: Number;
  @ViewChild('filesInput') filesInput: ElementRef;

  uploadingFiles: Boolean;
  stagedFiles: Map<String, File>;
  inProgressFiles: Map<String, UploadStatus>;

  constructor(private http: HttpClient, private fileService: FileService) { }

  ngOnInit() {
    this.uploadingFiles = false;
    this.stagedFiles = new Map();
    this.inProgressFiles = new Map();
    this.fileService.onFileUploaded().subscribe(f => this.inProgressFiles.delete(f.name));
  }

  // Opens the file selector window
  triggerFileDialog() {
    (<HTMLElement>this.filesInput.nativeElement).click();
  }

  // Adds a file to the staged map
  addFiles(files: FileList) {
    Array.from(files).forEach((f: File) => this.stagedFiles.set(f.name, f));
  }

  // Removes a file from the staged map
  removeFile(file: File) {
    this.stagedFiles.delete(file.name);
  }

  // Move files from the staged to the inProgress map and start the upload service
  uploadFiles() {
    this.stagedFiles.forEach((v, k) => {
      if (!this.inProgressFiles.has(k)) {
        this.inProgressFiles.set(k, this.fileService.uploadFile(this.folderId, v));
        this.stagedFiles.delete(k);
      }
    });
  }

  // Removes all of the files in the staged map as well as in the input element
  clearFiles() {
    // Clear the fileMap
    this.stagedFiles.clear();
    // Clear the uploadFiles element
    this.filesInput.nativeElement.value = '';
  }

  // Formats bytes into a more human readable format
  formatBytes(bytes: number, decimals: number): String {
    if (bytes === 0) {
      return '0 Bytes';
    } else {
      const k = 1024,
        dm = decimals <= 0 ? 0 : decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
  }
}
