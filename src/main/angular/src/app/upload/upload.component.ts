import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
    @ViewChild('filesInput') filesInput: ElementRef;
    @Input() folderId: Number;
    stagedFiles: Map<String, File>;
    inProgressFiles: Map<String, UploadStatus>;
    uploadingFiles: Boolean;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.stagedFiles = new Map();
        this.inProgressFiles = new Map();
        this.uploadingFiles = false;
    }

    // Opens the file selector window
    triggerFileDialog() {
        (<HTMLElement>this.filesInput.nativeElement).click();
    }

    // Adds a file to the staged map
    addFiles(files: FileList) {
        Array.from(files).forEach((f: File) => {
            this.stagedFiles.set(f.name, f);
        });
        console.log(this.stagedFiles);
    }

    // Removes a file from the staged map
    removeFile(file: File) {
        this.stagedFiles.delete(file.name);
        console.log('Removing: ' + file.name);
    }

    // Move files from the staged to the inProgress map and start the upload service
    uploadFiles() {
        this.stagedFiles.forEach((v, k) => {
            if (!this.inProgressFiles.has(k)) {
                this.inProgressFiles.set(k, new UploadStatus(v, 0, 0));
                this.stagedFiles.delete(k);
            }
        });
        if (!this.uploadingFiles) {
            this.uploadService();
            this.uploadingFiles = true;
        }
    }

    // Upload one file at a time from the inProgress map
    uploadService() {
        const result = this.inProgressFiles.values().next();

        if (!result.done) {
            const formData: FormData = new FormData();
            formData.append('file', result.value.getFile(), result.value.getFile().name);

            const req = new HttpRequest('POST', `api/folder/${this.folderId}/file`, formData, { reportProgress: true });
            let lastSize = 0;
            let lastTime = Math.floor(Date.now());
            this.http.request(req).subscribe((event) => {
                if (event.type === HttpEventType.UploadProgress) {
                    const currentTime = Math.floor(Date.now());
                    result.value.setSpeed(Math.round((event.loaded - lastSize) / (currentTime - lastTime)) * 1000);
                    result.value.setPercentComplete(Math.round(100 * event.loaded / event.total));
                    lastTime = currentTime;
                    lastSize = event.loaded;
                } else if (event.type === HttpEventType.Response) {
                    console.log(event);
                    this.inProgressFiles.delete(result.value.getFile().name);
                    this.uploadService();
                }
            });
        } else {
            this.uploadingFiles = false;
        }
    }

    // Removes all of the files in the staged map as well as in the input element
    clearFiles() {
        // Clear the fileMap
        this.stagedFiles.clear();
        // Clear the uploadFiles element
        this.filesInput.nativeElement.value = '';
        console.log('Files Cleared!');
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

class UploadStatus {
    file: File;
    speed: Number;
    percentComplete: Number;

    constructor(file: File, speed: Number, percentComplete: Number) {
        this.file = file;
        this.speed = speed;
        this.percentComplete = percentComplete;
    }

    setSpeed(speed: Number) {
        this.speed = speed;
    }

    setPercentComplete(percentComplete: Number) {
        this.percentComplete = percentComplete;
    }

    getFile(): File {
        return this.file;
    }

    getSpeed(): Number {
        return this.speed;
    }

    getPercentComplete(): Number {
        return this.percentComplete;
    }
}