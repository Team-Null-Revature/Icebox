import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Folder } from '../shared/models/folder.model';
import { FolderService } from '../shared/services/folder.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  @Input() currentFolderId: number;
  @Output() folderCreated = new EventEmitter<Folder>();

  public folder: Folder;

  constructor(private fos: FolderService) {}

  ngOnInit() {
    this.folder = new Folder();
  }

  onSubmit() {
    this.fos.addFolder(this.folder, this.currentFolderId).subscribe(resp => {
      this.folderCreated.emit(resp);
      this.folder.name = '';
    });
  }
}
