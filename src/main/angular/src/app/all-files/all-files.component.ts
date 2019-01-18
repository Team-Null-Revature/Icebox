import { Component, OnInit } from '@angular/core';
import { File } from '../shared/models/file.model';
import { FileService } from '../shared/services/file.service';

@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.css']
})
export class AllFilesComponent implements OnInit {
  public files: File[];
  constructor(private fileService: FileService) {}

  ngOnInit() {
    this.fileService.getFiles().subscribe(files => (this.files = files));
  }
}
