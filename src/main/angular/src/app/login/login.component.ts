import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { UserServiceService } from '../shared/services/user.service';
import { FolderService } from '../shared/services/folder.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  incorrect: Boolean;

  constructor(private us: UserServiceService, private fs: FolderService, private router: Router) {}

  ngOnInit() {
    this.user = new User();
    this.incorrect = false;
    this.us.checkLogin().subscribe(resp => {
      if (resp != null) {
        this.redirectRoot();
      }
    });
  }

  Login() {
    this.us.sendLogin(this.user).subscribe(resp => {
      console.log(resp);
      if (resp == null) {
        this.incorrect = true;
      } else {
        this.redirectRoot();
      }
    });
  }

  private redirectRoot(): void {
    this.fs.getRoot().subscribe(root => {
      this.router.navigate([`/home/folder/${root.id}/file/0`]);
    });
  }
}
