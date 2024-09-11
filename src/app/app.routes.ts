import { Routes } from '@angular/router';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { TimelineComponent } from './component/timeline/timeline.component';
import { authGuard } from './core/guards/auth.guard';
import { blankGuard } from './core/guards/blank.guard';
import { UserPostsComponent } from './component/user-posts/user-posts.component';

export const routes: Routes = [
    {path:'',redirectTo:"register",pathMatch:"full"},
    {path:'register',component:SignupComponent,title:"Sign up",canActivate:[authGuard]},
    {path:'login',component:LoginComponent,title:"login",canActivate:[authGuard]},
    {path:'timeline',component:TimelineComponent,title:"Social-App",canActivate:[blankGuard]},
    {path:'profile',component:UserPostsComponent,title:"profile",canActivate:[blankGuard]}
];
