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
      if (id) {
        this.fileService.getFile(id).subscribe(file => this.openFile = file);
     }
  }
  share() {
      this.fileService.shareFile(this.openFile);
    }

  editFile() {
      this.router.navigate(['/files/edit', this.openFile.id]);
  }

}
