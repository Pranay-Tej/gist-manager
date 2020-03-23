import { Component, OnInit } from '@angular/core';
import { UsernameService } from 'src/app/services/username.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  setUsername(username: string) {
    this.usernameService.setUsername(username);
    this.router.navigateByUrl('/library');
  }

  constructor(
    private usernameService: UsernameService,
    private router: Router
    ) { }

  ngOnInit() {
  }

}
