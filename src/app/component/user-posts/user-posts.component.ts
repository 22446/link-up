import { Component, inject } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { Ipost } from '../../core/interfaces/ipost';
import { DatePipe } from '@angular/common';
import { CommentComponent } from "../comment/comment.component";
import { NavbarBlankComponent } from "../navbar-blank/navbar-blank.component";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Iuser } from '../../core/interfaces/iuser';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [DatePipe, CommentComponent,FormsModule, NavbarBlankComponent,DialogModule, ButtonModule, InputTextModule],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.scss'
})
export class UserPostsComponent {
  visible: boolean = false;
  page: number = 1;
   Filename!:File
   content:string=''
  showDialog() {
      this.visible = true;
  }
  private _PostsService=  inject(PostsService)
  private _AuthService=  inject(AuthService)
  PostData:Ipost[]=[]
  UserInfo:Iuser={}as Iuser 

  ngOnInit(): void {
    this.getUserPosts()
    this.getUserInfo()
  }

  getUserPosts(){
  this._PostsService.getUserPost().subscribe({
    next:(res)=>{
    this.PostData=res.posts
      console.log(res)
    }
  })

}
CreatePost(){
  const fromDataa=new FormData();
  fromDataa.append('body',this.content)
  fromDataa.append('image',this.Filename)

  this._PostsService.postApost(fromDataa).subscribe({
    next:(res)=>{
      this.getUserPosts()
      console.log(res)
    }
  })
}
getUserInfo(){
  this._AuthService.UserInfo().subscribe({
    next:(res)=>{
      this.UserInfo=res.user
      console.log(res)
    }
  })
}
  ChangeImage(e:Event){
    const file=e.target as HTMLInputElement
 
    if(file.files&&file.files.length>0){
    this.Filename=file.files[0]
    console.log(this.Filename)
    }
   }
   deletePostUser(id:string|null){
    this._PostsService.DeleteUserPost(id).subscribe({
      next:(res)=>{
        console.log(res)
      this.getUserPosts()

      }
    })
   }
  
}
