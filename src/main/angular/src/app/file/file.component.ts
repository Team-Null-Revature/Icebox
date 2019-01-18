import { DatePipe } from '@angular/common';
import { Tag } from '../shared/models/tag.model';
import { File } from '../shared/models/file.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TagService } from '../shared/services/tag.service';
import { FileService } from '../shared/services/file.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  @Input() openFile: File;
  tag: Tag;

  constructor(private fileService: FileService, private router: Router, private route: ActivatedRoute, private tagServ: TagService) { }

  ngOnInit() {
    this.tag = new Tag();
    const id = +this.route.snapshot.paramMap.get('id');
    const share = this.route.snapshot.paramMap.get('sharestr');
    if (id !== 0) {
      this.fileService.getFile(id).subscribe(file => (this.openFile = file));
    }
    if (share !== null) {
      this.fileService.getShareFile(share).subscribe(file => (this.openFile = file));
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

  add_tag() {
    console.log('from file.component.ts');
    console.log(this.tag);
    console.log(this.openFile);

    this.tagServ.addTag(this.tag, this.openFile).subscribe(resp => {
      console.log(resp);
    });
    window.location.reload();
  }
}
