import { Component, OnInit } from '@angular/core';
import { CommentService } from '../shared/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  private comments : Comment[];
  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.populateComments();
  }

  populateComments(){
    this.commentService.getComments(2).subscribe(comments => {
      console.log("Comments:");
      console.log(comments);
      this.comments = comments;
    });
  }
}
