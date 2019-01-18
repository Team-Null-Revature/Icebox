import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../shared/user-service.service';
import { FolderService } from '../shared/folder.service';
import { FileService } from '../files/shared/file.service';
import { DirectoryComponent } from '../directory/directory.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  folderId: Number;
  fileId: number;


  constructor(
    private uService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private folderServ: FolderService,
    private fileServ: FileService,
    private directory: DirectoryComponent
    ) {}

  ngOnInit() {
    console.log('Making home');
    this.uService.checkLogin().subscribe(
      resp => {
          if (resp == null) {
              this.router.navigate(['/login']);
          }
      }
    );
    this.route.paramMap.subscribe(params => {
        if (params.get('id')) {
           this.fileId = +params.get('id');
        }
    });


    this.route.paramMap.subscribe(params => {
      if (params.get('folderId')) {
        this.folderId = +params.get('folderId');
        this.reloadWhenDone();
      } else {
        this.folderServ.getRoot().subscribe(root => {
          this.folderId = root.id;
          this.reloadWhenDone();
        });
      }
    });
  }

  reloadWhenDone() {
    this.fileServ.onFileUploaded().subscribe(file => {
      // this.directory.reload();
    });
  }
}
