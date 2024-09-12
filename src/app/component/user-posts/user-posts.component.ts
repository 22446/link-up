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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [DatePipe, CommentComponent,FormsModule,RouterLink, NavbarBlankComponent,DialogModule, ButtonModule, InputTextModule],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.scss'
})
export class UserPostsComponent {
  visible2: boolean = false;
  visible3: boolean = false;
  visible: boolean = false;
  Filename!:File
   content:string=''
  showDialog() {
      this.visible = true;
  }
  showDialog2() {
      this.visible2 = true;
  }
  showDialog3() {
      this.visible3= true;
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
   logoutsubmit(){
    this._AuthService.logout()
  }
  
   fileName!:File
   ChangePhoto(e:Event){
    const file=e.target as HTMLInputElement
    if(file.files&&file.files?.length>0)
    this.fileName=file.files[0]
    console.log(this.fileName)
   }
   submitChagePhoto(){
    const formdataa=new FormData()
    formdataa.append('photo',this.fileName)
    this._AuthService.UserChangePhoto(formdataa).subscribe({
      next:(res)=>{
        console.log(res)
        this.getUserPosts()
        this.getUserInfo()

      }
    })
   }
   ContentUpdated:string=''
   NameFileUpdate!:File
   ChangePhotoForUpdate(e:Event){
    const file=e.target as HTMLInputElement
    if(file.files&&file.files.length>0){
      this.NameFileUpdate=file.files[0]
    }
   }
   updatePost(id:string|null){
    const formDataupdated=new FormData()
    formDataupdated.append('body',this.ContentUpdated)
    formDataupdated.append('image',this.NameFileUpdate)
    this._PostsService.UpdateUserPost(id,formDataupdated).subscribe({
      next:(res)=>{
        console.log(res)
        this.getUserPosts()
      }
    })
   }
}
