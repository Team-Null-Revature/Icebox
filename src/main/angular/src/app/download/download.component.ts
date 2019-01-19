import { File } from '../shared/models/file.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  @Input() file: File;

  constructor() {}

  ngOnInit() {}

  // Download the file
  download() {
    // Base URL for file downloading
    let url = `${document.getElementsByTagName('base')[0].href}api/files/`;
    // Check if there is a file
    if (this.file) {
      // Check if there is a share string
      if (this.file.share) {
        // Download by share string
        url += `shared/${this.file.share}/dl`;
        console.log('Downloading by share');
      } else {
        // Download by file id
        url += `${this.file.id}/dl`;
        console.log('Downloading by id');
      }
      // Begin the download
      window.open(url);
    }
  }
}
