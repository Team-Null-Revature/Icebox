import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
    @ViewChild('filesInput') filesInput: ElementRef;
    stagedFiles: Map<String, File>;
    inProgressFiles: Map<String, Pair<File, Number>>;
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
                const kp: Pair<File, Number> = new Pair(v, 0);
                this.inProgressFiles.set(k, kp);
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
            const timer = setInterval(() => {
                result.value.setValue(+result.value.getValue() + 1);
                if (result.value.getValue() === 100) {
                    this.inProgressFiles.delete(result.value.getKey().name);
                    clearInterval(timer);
                    this.uploadService();
                }
            }, 250);
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

// Utility tuple
class Pair<K, V> {
    key: K;
    value: V;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }

    setKey(key: K) {
        this.key = key;
    }

    setValue(value: V) {
        this.value = value;
    }

    getKey(): K {
        return this.key;
    }

    getValue(): V {
        return this.value;
    }
}
