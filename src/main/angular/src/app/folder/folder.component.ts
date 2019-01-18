import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FolderService} from '../shared/folder.service';
import {Folder} from 'src/app/shared/folder';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  public folders: Folder[];
  public folder = new Folder;

  //Needs user, so add a user service too
  constructor(private http: HttpClient, private foldServ: FolderService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() { }

  onSubmit(){
    console.log("Submitting new folder!")
    console.log("variable:");
    this.route.params.subscribe(params => {
      let pId = +params['folderId'];
      if(!(pId > 0)){ //checking if it's not a number in the only way that i found to work
        this.attachToRoot();
      }
      else{
        this.foldServ.addFolder(this.folder,+params['folderId']).subscribe(
          resp => {
            console.log(resp);
          }
        );
      }
    });
    
    //this.router.navigate(['/home'])
  }

  attachToRoot(){
    console.log("Initializing Directory")
    this.foldServ.getRoot().subscribe(root => {
      this.foldServ.addFolder(this.folder,root.id).subscribe(
        resp => {
          console.log(resp);
        }
      );
    })
  }
}
