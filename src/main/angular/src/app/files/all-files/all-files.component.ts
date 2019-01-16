import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/files/shared/file.service';
import { File } from 'src/app/files/shared/file';

@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.css']
})
export class AllFilesComponent implements OnInit {
    public files: File[];
  constructor(private fileService: FileService) { }

  ngOnInit() {
      this.fileService.getFiles().subscribe(files => this.files = files);
  }

}
