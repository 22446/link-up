import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmenr } from '../environment/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _HtppClient=inject(HttpClient)
  private _Router=inject(Router)
  signUpServfunc(data:object):Observable<any>{
    return this._HtppClient.post(`${environmenr.baseUrl}/users/signup`,data)
  }
  signInServfunc(data:object):Observable<any>{
    return this._HtppClient.post(`${environmenr.baseUrl}/users/signin`,data)
  }
  
  logout(){
    if(localStorage.getItem('socialToken')!==null)
    {
      localStorage.removeItem('socialToken')
      this._Router.navigate(['/login'])
    }
  }
  UserInfo():Observable<any>{
    return this._HtppClient.get(`${environmenr.baseUrl}/users/profile-data`)
  }
  UserChangePhoto(data:object):Observable<any>{
    return this._HtppClient.put(`${environmenr.baseUrl}/users/upload-photo`,data)
  }
}
