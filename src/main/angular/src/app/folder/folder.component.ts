import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FolderService} from '../shared/folder.service';
import {Folder} from 'src/app/folder';
import { Router } from '@angular/router';

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
  constructor(private http: HttpClient, private foldServ: FolderService, private router: Router) { }

  ngOnInit() { }

  onSubmit(){
    this.foldServ.addFolder(this.folder).subscribe(
      resp => {
        console.log(resp);
      }
    );
    this.router.navigate(['/folder'])
  }

}
