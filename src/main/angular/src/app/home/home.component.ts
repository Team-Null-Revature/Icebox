import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../shared/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  folderId: Number;

  constructor(private uService: UserServiceService,private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    console.log("Making home");
    this.uService.checkLogin().subscribe(
      resp => {
          if(resp == null){
              this.router.navigate(['/login']);
          }
      }
    );
    this.route.paramMap.subscribe(params => (this.folderId = +params.get('folderId')));
  }
}
