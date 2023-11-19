import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private appServiceService: AppServiceService, private route: Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    })
  } 

  login() {
    var loginObj = {
      "username": this.loginForm.value.username,
      "password": this.loginForm.value.password
      }

      this.appServiceService.login(loginObj).subscribe((res: any) => {
        this.route.navigate(['landing']);
      }, error => {
        // if (error.status == '400') {
          console.log(error.status)
        // }
      });
      
  }
}
