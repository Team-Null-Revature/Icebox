import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable, pipe, of, Observer, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadStatus } from '../models/uploadStatus.model';
import { File as FileCustom } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private inProgressFiles: Map<String, UploadStatus>;
  private appUrl: string;
  private uploading: boolean;
  private headers: HttpHeaders;
  private fileUploaded: Observable<FileCustom>;
  private fileUploadedObserver: Observer<FileCustom>;

  constructor(private http: HttpClient) {
    this.uploading = false;
    this.appUrl = 'api/files';
    this.inProgressFiles = new Map();
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.fileUploaded = new Observable(observer => (this.fileUploadedObserver = observer));
  }

  getFiles(): Observable<FileCustom[]> {
    return this.http.get(this.appUrl, { withCredentials: false }).pipe(map(resp => resp as FileCustom[]));
  }
  getFile(id: number): Observable<FileCustom> {
    const url: string = this.appUrl + '/' + id;
    return this.http.get(url, { withCredentials: false }).pipe(map(resp => resp as FileCustom));
  }
  getShareFile(sharestr: string): Observable<FileCustom> {
    const url: string = this.appUrl + '/shared/' + sharestr;
    return this.http.get(url, { withCredentials: false }).pipe(map(resp => resp as FileCustom));
  }
  getAllShared(): Observable<FileCustom[]> {
    const url: string = this.appUrl + '/shared';
    return this.http.get(url, { withCredentials: false }).pipe(map(resp => resp as FileCustom[]));
  }
  updateFile(file: FileCustom): Observable<FileCustom> {
    const body = JSON.stringify(file);
    if (file.id) {
      const url = this.appUrl + '/' + file.id;
      return this.http.put(url, body, { headers: this.headers, withCredentials: false }).pipe(map(resp => resp as FileCustom));
    } else {
      return this.http.post(this.appUrl, body, { headers: this.headers, withCredentials: false }).pipe(map(resp => resp as FileCustom));
    }
  }

  getFilesByFolder(fId: Number): Observable<FileCustom[]> {
    return this.http.get('api/files/folder=' + fId).pipe(
        map(resp => resp as FileCustom[])
      );
    }

  // Remove a file from the DB
  deleteFile(id: number) {
    console.log('Deleting file with ID ' + id);
    return this.http.delete('api/files/' + id);
  }

  shareFile(file: FileCustom): Observable<FileCustom> {
    const body = JSON.stringify(file);
    const url = this.appUrl + '/share';
    return this.http.put(url, body, { headers: this.headers, withCredentials: false }).pipe(map(resp => resp as FileCustom));
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

  // Remove the file from the Map and notify subscribers
  private uploaded(file: FileCustom): void {
    this.inProgressFiles.delete(file.name);
    this.fileUploadedObserver.next(file);
  }

  // Observable for file upload events
  onFileUploaded(): Observable<FileCustom> {
    return this.fileUploaded;
  }
  // get all files from search
  getSearch(s: String): Observable<FileCustom[]> {
    return this.http.get('api/files/search/' + s).pipe(
        map(resp => resp as FileCustom[])
      );
  }
  //Change name of a file in the DB
  editFile(file: FileCustom): Observable<FileCustom>{
    console.log("Updating File...");
    console.log(File);
    return this.http.post('api/files/rename', file).pipe(map(resp => resp as FileCustom));
  }
}
