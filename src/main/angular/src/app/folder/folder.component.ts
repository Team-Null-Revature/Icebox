import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Folder } from '../shared/models/folder.model';
import { FolderService } from '../shared/services/folder.service';
import { DirectoryComponent } from '../directory/directory.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  public folders: Folder[];
  public folder: Folder;

  // Needs user, so add a user service too
  constructor(private foldServ: FolderService, private route: ActivatedRoute, private directory: DirectoryComponent) {}

  ngOnInit() {
    this.folder = new Folder();
  }

  onSubmit() {
    console.log('Submitting new folder!');
    console.log('variable:');
    this.route.params.subscribe(params => {
      const pId = +params['folderId'];
      
      if (!(pId > 0)) {
        // checking if it's not a number in the only way that i found to work
        this.attachToRoot();
      } else {
        this.foldServ.addFolder(this.folder, +params['folderId']).subscribe(resp => {
          console.log(resp);
          this.directory.reload();
        });
      }
    });
  }

  attachToRoot() {
    console.log('Initializing Directory');
    this.foldServ.getRoot().subscribe(root => {
      this.foldServ.addFolder(this.folder, root.id).subscribe(resp => {
        console.log(resp);
        this.directory.reload();
      });
    });
  }
}
