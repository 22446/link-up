import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { Ipost, RootObject } from '../../core/interfaces/ipost';
import { DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserModule } from '@angular/platform-browser';
import { CommentComponent } from "../comment/comment.component";
import { NavbarBlankComponent } from "../navbar-blank/navbar-blank.component";

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [InfiniteScrollModule, DatePipe, DialogModule, ButtonModule, InputTextModule, FormsModule, CommentComponent, NavbarBlankComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit {
  visible: boolean = false;
  page: number = 1;
   Filename!:File
   content:string=''
  showDialog() {
      this.visible = true;
  }
  private _PostsService=  inject(PostsService)
  PostData:Ipost[]=[]
  PostData2:RootObject={}as RootObject
  ngOnInit(): void {
    this.getPosts()
  }

  getPosts(){
  this._PostsService.GetAllPosts().subscribe({
    next:(res)=>{
    this.PostData=res.posts
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
  CreatePost(){
    const fromDataa=new FormData();
    fromDataa.append('body',this.content)
    fromDataa.append('image',this.Filename)

    this._PostsService.postApost(fromDataa).subscribe({
      next:(res)=>{
        this.getPosts()
        console.log(res)
      }
    })

    
  }


}
