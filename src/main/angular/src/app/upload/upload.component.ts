import { HttpClient } from '@angular/common/http';
import { FileService } from '../shared/services/file.service';
import { UploadStatus } from '../shared/models/uploadStatus.model';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

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
}
