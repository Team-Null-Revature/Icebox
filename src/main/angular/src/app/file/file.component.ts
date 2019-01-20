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
  @Input() selectedFile: File;
  tag: Tag;

  constructor(private fileService: FileService, private router: Router, private route: ActivatedRoute, private tagServ: TagService) {}

  ngOnInit() {
    this.tag = new Tag();
    const share = this.route.snapshot.paramMap.get('sharestr');
    if (share !== null) {
      this.fileService.getShareFile(share).subscribe(file => (this.selectedFile = file));
    }
  }

  share() {
    if (this.selectedFile.share == null) {
      this.fileService.shareFile(this.selectedFile).subscribe(file => {
        this.selectedFile = file;
        alert('Link created: icebox/shared/' + this.selectedFile.share);
      });
    } else {
      alert('Link already created: icebox/shared/' + this.selectedFile.share);
    }
  }

  editFile() {
    this.router.navigate(['/files/edit', this.selectedFile.id]);
  }

  add_tag() {
    console.log('from file.component.ts');
    console.log(this.tag);
    console.log(this.selectedFile);

    this.tagServ.addTag(this.tag, this.selectedFile).subscribe(resp => {
      console.log(resp);
      this.selectedFile.tags.push(resp);
    });
  }

  delete_tag(tag: Tag){
    console.log('in delete tag');
    console.log('tag: ' + tag.id);
    console.log(tag);
    
    console.log('file: ' + this.selectedFile.id);

    this.tagServ.deleteTag(tag, this.selectedFile).subscribe(resp => {
      console.log(resp);
      this.selectedFile.tags = this.selectedFile.tags.filter(t => t.id != tag.id);
    });
  }
}
