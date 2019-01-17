import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Tag } from '../files/shared/tag';
import { TagService } from '../files/shared/tag.service';
=======
import { Router, ActivatedRoute } from '@angular/router';
>>>>>>> 77afda697aca43bd9f310263c2441bbea11326f8

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
<<<<<<< HEAD
  tag = new Tag();
  constructor(private tagServ: TagService) { }
=======
  folderId: Number;

  constructor(private router: Router, private route: ActivatedRoute) {}
>>>>>>> 77afda697aca43bd9f310263c2441bbea11326f8

  ngOnInit() {
    this.route.paramMap.subscribe(params => (this.folderId = +params.get('folderId')));
  }
<<<<<<< HEAD

  add_tag(){
    this.tagServ.addTag(this.tag).subscribe(
      resp => {
        console.log(resp); 
      }
    );
  }
=======
>>>>>>> 77afda697aca43bd9f310263c2441bbea11326f8
}
