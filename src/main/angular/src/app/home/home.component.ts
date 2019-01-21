import { Component, OnInit } from '@angular/core';
import { File } from '../shared/models/file.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from '../shared/services/file.service';
import { FolderService } from '../shared/services/folder.service';
import { UserServiceService } from '../shared/services/user.service';
import { DirectoryComponent } from '../directory/directory.component';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  folderId: Number;
  fileId: number;
  selectedFile: File;

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
        this.fileServ.getFile(+params.get('id')).subscribe(f => this.selectedFile = f);
        }
        if (params.get('sharestr')) {
            this.fileServ.getShareFile(params.get('sharestr')).subscribe(f => this.selectedFile = f);
        }
    });

    this.route.paramMap.subscribe(params => {
      if (params.get('folderId')) {
        this.folderId = +params.get('folderId');
      } else {
        this.folderServ.getRoot().subscribe(root => {
          this.folderId = root.id;
        });
      }
    });
  }

  // Set the file that was selected as the selected file
  onFileSelected(file: File) {
    this.selectedFile = file;
    // Change the URL to reflect the selected file
    this.router.navigate([`/home/folder/${file.folder.id}/file/${file.id}`]);
  }
}
