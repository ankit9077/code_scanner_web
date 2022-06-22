import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { emailRegex } from 'src/assets/constants';
import { User } from 'src/assets/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  errorMessage = '';
  cameFromOtherPages = false;
  successMessage = '';
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) {
      this.loginForm = formBuilder.group({
        email: ['', [Validators.required, Validators.pattern(emailRegex)]],
        password: ['', Validators.required]
      });
     }


    ngOnInit(): void {
      this.route.queryParams.subscribe((response) => {
        if (response && response.s) {
          if (response.s === '1') {
            this.successMessage = 'Verification email sent!!';
          } else if (response.s === '2') {
            this.successMessage = 'Password Changed Successfully';
          }
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        }
      });
    }

    get formValues(): any { return this.loginForm.controls; }

    Login(): void {
      this.errorMessage = '';
      if (this.loginForm.valid) {
        const user = new User();
        user.email = this.formValues.email.value.trim();
        user.password = this.formValues.password.value;
        this.authenticationService.AuthenticateUser(user).then((response) => {
          this.router.navigate(['home']);
        }, (err) => {
          this.errorMessage = err.error.message;
        });
      } else {
        if (!this.loginForm.get('email').valid) {
          this.errorMessage = 'Enter a Valid Email';
        } else {
          this.errorMessage = 'Enter all mandatory fields';
        }
      }
    }
}
