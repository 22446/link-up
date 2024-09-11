import { Icomment } from './../../core/interfaces/icomment';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../core/services/comments.service';
import { DatePipe, NgClass } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [DatePipe,ReactiveFormsModule,NgClass,DialogModule, ButtonModule, InputTextModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit {
  _CommentsService=inject(CommentsService)
  _Formbulider=inject(FormBuilder)
  show:boolean=false
  userdata!:any
  isSent:boolean=false
  isSent2:boolean=false
  @Input({required:true})PostId!:string
  commentuser!:FormGroup
  commentData:Icomment[]=[]

  commentuserUpdate:FormGroup=this._Formbulider.group({
    content:[null],
  })
ngOnInit(): void {
 this.commentuser=this._Formbulider.group({
    content:[null],
    post:[this.PostId]
  })
  this.getallComment()
  if(localStorage.getItem("socialToken")!==null){
  this.userdata=localStorage.getItem("socialToken")
  this.userdata=jwtDecode(this.userdata)
  console.log(this.userdata)
  }
  
}
showInput(){
  this.show=true
}
getallComment(){
  this._CommentsService.GetPostComment(this.PostId).subscribe({
    next:(res)=>{
      this.commentData=res.comments.reverse()
      console.log(res)
    }
  })
}
createComment(){
  this.isSent=true
  this._CommentsService.createCommentOnpost(this.commentuser.value).subscribe({
    next:(res)=>{
      this.getallComment()
      this.commentuser.get('content')?.setValue('')
      console.log(res)
      this.isSent=false
    }
  })
}
updateComment(id:string|null){
  this.isSent2=true
  this._CommentsService.updateComment(this.commentuserUpdate.value,id).subscribe({
    next:(res)=>{
    this.getallComment()
    this.commentuserUpdate.get('content')?.setValue('')

     this.isSent2=false

    }
  })
}
showCommentdata(id:string,data:any){
this.commentuserUpdate.patchValue(data)
}
}
