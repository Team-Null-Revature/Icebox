import { Component, OnInit } from '@angular/core';
import { File } from '../shared/file';
import { Tag } from '../shared/tag';
import { TagService } from '../shared/tag.service';


@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  tag = new Tag();

  constructor(private tagServ: TagService) { }

  ngOnInit() {
  }

  add_tag(){
    this.tagServ.addTag(this.tag).subscribe(
      resp => {
        console.log(resp); 
      }
    );
  }
}
