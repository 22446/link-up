import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmenr } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private _HttpClient=inject(HttpClient)
  GetAllPosts():Observable<any>{
    return this._HttpClient.get(`${environmenr.baseUrl}/posts`)
  }
  postApost(data:object):Observable<any>{
    return this._HttpClient.post(`${environmenr.baseUrl}/posts`,data)
  }
}
