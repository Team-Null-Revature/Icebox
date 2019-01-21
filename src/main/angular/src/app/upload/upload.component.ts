import { File as FileCustom } from '../shared/models/file.model';
import { UploadStatus } from '../shared/models/uploadStatus.model';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Input() folderId: Number;
  @Output() fileUploaded = new EventEmitter<FileCustom>();
  @ViewChild('filesInput') filesInput: ElementRef;

  uploading: boolean;
  stagedFiles: Map<String, File>;
  inProgressFiles: Map<String, UploadStatus>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.uploading = false;
    this.stagedFiles = new Map();
    this.inProgressFiles = new Map();
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
        this.uploadFile(this.folderId, v);
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

  // Queue a file to be uploaded
  uploadFile(folderId: Number, file: File): UploadStatus {
    // Create a new UploadStatus with the file to be uploaded
    const uploadStatus = new UploadStatus(file, folderId, 0, 0);
    // Add it to the upload queue
    this.inProgressFiles.set(file.name, uploadStatus);
    // Start the upload service if its not running
    if (!this.uploading) {
      this.upload();
      this.uploading = true;
    }
    // Return the UploadStatus
    return uploadStatus;
  }

  // Starts the upload service
  private upload(): void {
    // Get the next value in the map
    const result = this.inProgressFiles.values().next();

    // Check if the next value exists
    if (!result.done) {
      // Create FormData and append the file to be uploaded to it
      const formData: FormData = new FormData();
      formData.append('file', result.value.getFile(), result.value.getFile().name);

      // Create a new POST request with the FormData
      const req = new HttpRequest('POST', `api/folder/${result.value.getFolderId()}/file`, formData, { reportProgress: true });
      let lastSize = 0;
      let lastTime = Math.floor(Date.now());
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const currentTime = Math.floor(Date.now());
          result.value.setSpeed(Math.round((event.loaded - lastSize) / (currentTime - lastTime)) * 1000);
          result.value.setPercentComplete(Math.round((100 * event.loaded) / event.total));
          lastTime = currentTime;
          lastSize = event.loaded;
        } else if (event.type === HttpEventType.Response) {
          // Mark the file as uploaded
          this.uploaded(event.body as FileCustom);
          // Upload the next file in the map
          this.upload();
        }
      });
    } else {
      // No value in set, not uploading anymore
      this.uploading = false;
    }
  }

  // Remove the file from the Map and emit the file uploaded event
  private uploaded(file: FileCustom): void {
    this.inProgressFiles.delete(file.name);
    this.fileUploaded.emit(file);
  }
}
