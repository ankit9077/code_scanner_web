import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/assets/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isloading = false;

  constructor(private userService: UserService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isloading = true;
    this.userService.GetUser().then((response: User) => {
      this.isloading = false;
    }, (err) => {
      this.isloading = false;
    });
  }

  logout() {
    this.authenticationService.logout();
  }

}
