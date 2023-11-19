import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],

})
export class SignupComponent {
  signupForm: FormGroup;
  validUsername: string = "Type a valid username";
  validUser: boolean = false;
  otpDialogue: boolean = false;
  successDialogue: boolean = false;
  errorDialogue: boolean = false;
  otpGenerated: string = "";
  otpGeneratedFlag: boolean = false;
  transactionId: string = "";

  constructor(private formBuilder: FormBuilder, private appServiceService: AppServiceService, private route: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: [''],
      password: [''],
      email: [''],
      phCode: [''],
      phNo: ['']
    })
  }

  checkUsername() {
    this.appServiceService.verifyUsername(this.signupForm.value.username).subscribe(res => {
      this.validUsername = 'username is available';
      this.validUser = true;
    }, error => {
      if (error.status == '400') {
        this.validUsername = 'username is NOT available';
        this.validUser = false;
      }
    });
  }

  verifyOTP() {
    this.otpDialogue = true;

    var generateOTPObj = {
      "contactInfo": {
        "email": this.signupForm.value.email,
        "phone": {
          "code": this.signupForm.value.phCode,
          "number": this.signupForm.value.phNo
        }
      },
      "requestType": "EMAIL_OTP"
    }

    this.appServiceService.generateOTP(generateOTPObj).subscribe(res => {
      this.otpGenerated = "123456";
      this.otpGeneratedFlag = true;
    }, error => {
      if (error.status == '400') {
        this.otpGeneratedFlag = false;
        console.log(this.otpGeneratedFlag)
      }
    });
  }



  validateOTP() {
    if (this.otpGenerated == "123456") {
      var validateOTPObj = {
        "contactInfo": {
          "email": this.signupForm.value.email,
          "phone": {
            "code": this.signupForm.value.phCode,
            "number": this.signupForm.value.phNo,
          }
        },
        "requestType": "EMAIL_OTP",
        "otp": this.otpGenerated
      }
    }

    this.appServiceService.validateOTP(validateOTPObj).subscribe((res: any) => {
      this.successDialogue = true;
      this.otpDialogue = false;
      this.transactionId = res.transactionId;

    }, error => {
      this.errorDialogue = true;
      this.otpDialogue = false;
    });
  }


  signUpConfirm() {
    var signupObj = {
      "loginInfo": {
        "username": this.signupForm.value.username,
        "password": this.signupForm.value.password
      },
      "contactInfo": {
        "phone": {
          "code": this.signupForm.value.phCode,
          "number": this.signupForm.value.phNo,
        },
        "email": this.signupForm.value.email,
      },
      "transactionId": this.transactionId
    }

    this.appServiceService.signup(signupObj).subscribe(() => {
      this.route.navigate(['login']);

    }, error => {
      console.log(error.status)

    });

  }

  signUpFailed() {
    this.errorDialogue = false;
  }
}
