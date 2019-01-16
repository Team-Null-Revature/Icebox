import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/files/shared/file.service';
import { File } from 'src/app/files/shared/file';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
    @Input() openFile: File;
  constructor(
      private fileService: FileService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
      const id = +this.route.snapshot.paramMap.get('id');
      const share = +this.route.snapshot.paramMap.get('sharestr');
      if (id) {
        this.fileService.getFile(id).subscribe(file => this.openFile = file);
     }
     if (share) {
         this.fileService.getFile(share).subscribe(file => this.openFile = file);
     }
    }

    share() {
        console.log(this.openFile);
      console.log('Share');
      console.log(this.openFile.sharestr);
      if (this.openFile.sharestr == null) {
         this.fileService.shareFile(this.openFile).subscribe(file => {
                 this.openFile = file;
                 alert('Link created: icebox/files/shared/' + this.openFile.sharestr);
            });
         console.log('alerting');
      } else {
        alert('Link already created: icebox/files/shared/' + this.openFile.sharestr);
      }
    }

  editFile() {
      this.router.navigate(['/files/edit', this.openFile.id]);
  }

}
