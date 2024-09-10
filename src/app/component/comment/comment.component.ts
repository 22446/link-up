import { Icomment } from './../../core/interfaces/icomment';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../core/services/comments.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [DatePipe,ReactiveFormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit {
  _CommentsService=inject(CommentsService)
  _Formbulider=inject(FormBuilder)
  isSent:boolean=false
  @Input({required:true})PostId!:string
  commentuser!:FormGroup
  commentData:Icomment[]=[]
ngOnInit(): void {
 this.commentuser=this._Formbulider.group({
    content:[null],
    post:[this.PostId]
  })
  this.getallComment()
 
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


}
