import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/shared/services/file.service';
import { File } from 'src/app/shared/models/file.model';
import { Tag } from 'src/app/shared/models/tag.model';
import { TagService } from 'src/app/shared/services/tag.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
    @Input() openFile: File;

    tag = new Tag();
    file = new File();
  constructor(
      private fileService: FileService,
      private router: Router,
      private route: ActivatedRoute,
      private tagServ: TagService
  ) { }

  ngOnInit() {
      const id = +this.route.snapshot.paramMap.get('id');
      const share = this.route.snapshot.paramMap.get('sharestr');
      if (id !== 0) {
        this.fileService.getFile(id).subscribe(file => this.openFile = file);
     }
     if (share !== null) {
        this.fileService.getShareFile(share).subscribe(file => this.openFile = file);
     }
    }

    share() {
      if (this.openFile.share == null) {
         this.fileService.shareFile(this.openFile).subscribe(file => {
                 this.openFile = file;
                 alert('Link created: icebox/shared/' + this.openFile.share);
            });
      } else {
        alert('Link already created: icebox/shared/' + this.openFile.share);
      }
    }

  editFile() {
      this.router.navigate(['/files/edit', this.openFile.id]);
  }

  add_tag(){
    console.log("from file.component.ts");
    console.log(this.tag);
    console.log(this.openFile);
    this.tagServ.addTag(this.tag, this.openFile).subscribe(
      resp => {
        console.log(resp); 
      }
    );
    window.location.reload();
  }

  delete_tag(file: File){
    console.log("in delete_tag")
    window.location.reload();
  }

}
