import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmenr } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {  
  private _HttpClient=inject(HttpClient)
  GetPostComment(id:string|null):Observable<any>{
    return this._HttpClient.get(`${environmenr.baseUrl}/posts/${id}/comments`)
  }
  createCommentOnpost(data:object):Observable<any>
  {
    return this._HttpClient.post(`${environmenr.baseUrl}/comments`,data)
  }
  updateComment(data:object,id:string|null):Observable<any>{
    return this._HttpClient.put(`${environmenr.baseUrl}/comments/${id}`,data)

  }

}
