import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private apiCount = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  verifyUsername(name: string) {
    return this.http.get('https://dznsxr5s1i.execute-api.ap-south-1.amazonaws.com/develop/users/isvalidusername', {
      params: { username: name }
    });
  }

  generateOTP(data: any) {
    return this.http.post('https://dznsxr5s1i.execute-api.ap-south-1.amazonaws.com/develop/otp/generate', data);
  }

  validateOTP(data: any) {
    return this.http.post('https://dznsxr5s1i.execute-api.ap-south-1.amazonaws.com/develop/otp/validate', data);
  }

  signup(data: any) {
    return this.http.post('https://dznsxr5s1i.execute-api.ap-south-1.amazonaws.com/develop/users/signup', data);
  }

  login(data: any) {
    return this.http.post('https://dznsxr5s1i.execute-api.ap-south-1.amazonaws.com/develop/users/login', data);
  }

  showLoader() {
    if (this.apiCount === 0) {
      this.isLoadingSubject.next(true);
    }
    this.apiCount++;
  }

  hideLoader() {
    this.apiCount--;
    if (this.apiCount === 0) {
      this.isLoadingSubject.next(false);
    }
  }

}
