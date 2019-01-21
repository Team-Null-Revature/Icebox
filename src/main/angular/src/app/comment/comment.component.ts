import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../shared/services/comment.service';
import { File } from '../shared/models/file.model';
import { UserServiceService } from '../shared/services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  private comments : Comment[];
  private comment;
  private logged : Boolean;
  _selectedFile : File;
  constructor(private commentService: CommentService, private userService: UserServiceService) {}

  ngOnInit() {
    this.comment = new Comment;
    this.populateComments();
  }

  @Input()
  set selectedFile(selectedFile: File){
    this._selectedFile = selectedFile;
    this.populateComments();
  }

  checkLogged(){
    this.userService.checkLogin().subscribe(user => {
      if(user == null){
        this.logged == false;
      }else{
        this.logged == true;
      }
    })
  }

  populateComments(){
    this.commentService.getComments(this._selectedFile.id).subscribe(comments => {
      console.log("Comments:");
      console.log(comments);
      this.comments = comments;
    });
  }

  addComment(){
    this.commentService.addComment(this._selectedFile.id,this.comment).subscribe(comment =>{
      if(comment != null){
        this.comments.push(comment);
        this.comment.comment = '';
      }
      
    });


  }
}
