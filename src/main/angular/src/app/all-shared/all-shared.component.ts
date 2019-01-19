import { Component, OnInit } from '@angular/core';
import { File } from '../shared/models/file.model';
import { FileService } from '../shared/services/file.service';

@Component({
  selector: 'app-all-shared',
  templateUrl: './all-shared.component.html',
  styleUrls: ['./all-shared.component.css']
})
export class AllSharedComponent implements OnInit {
  public files: File[];
  constructor(private fileService: FileService) {}

  ngOnInit() {
    console.log('Calling all shared files');
    this.fileService.getAllShared().subscribe(files => (this.files = files));
  }
}
