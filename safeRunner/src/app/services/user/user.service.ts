import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/assets/models';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  private baseUrl = '/userInfo';

  constructor(private httpService: HttpService, private router: Router) {
    this.user = new User();
   }

  public GetUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Get(this.baseUrl).subscribe((response: any) => {
        this.user = response.result;
        resolve(response.result);
      }, (err) => {
        reject(err.error.message);
        localStorage.clear();
        this.router.navigate(['login']);
      });
    });
  }
}
