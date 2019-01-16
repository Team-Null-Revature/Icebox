import { Component, OnInit } from '@angular/core';
import { Tag } from '../files/shared/tag';
import { TagService } from '../files/shared/tag.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
