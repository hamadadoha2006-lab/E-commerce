import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { userDataResponce } from '../../models/user/user-data.interface';
import { jwtDecode } from 'jwt-decode';
import { stored_key } from '../../../constant/storedKey';
import { DecodeData } from '../../../service/decodeToken/decode-data.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  userDataDecode!: DecodeData;

  sendRegisterData(userData: object): Observable<userDataResponce> {
    return this.httpClient.post<userDataResponce>(environment.base_url + 'auth/signup', userData);
  }
  
  sendLoginData(userData: object): Observable<userDataResponce> {
    return this.httpClient.post<userDataResponce>(environment.base_url + 'auth/signin', userData);
  }

  forgotPassword(email: object): Observable<any> {
    console.log('API URL:', environment.base_url + 'auth/forgotPasswords');
    console.log('Request body:', email);
    return this.httpClient.post<any>(environment.base_url + 'auth/forgotPasswords', email);
  }

  verifyResetCode(resetCode: object): Observable<any> {
    return this.httpClient.post<any>(environment.base_url + 'auth/verifyResetCode', resetCode);
  }

  resetPassword(newPassword: object): Observable<any> {
    return this.httpClient.put<any>(environment.base_url + 'auth/resetPassword', newPassword);
  }

  decodeUserDataToken(): void {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem(stored_key.userToken)) {
      this.userDataDecode = jwtDecode(localStorage.getItem(stored_key.userToken)!);
      console.log(this.userDataDecode);
    }
  }

  isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    return !!localStorage.getItem(stored_key.userToken);
  }
}
