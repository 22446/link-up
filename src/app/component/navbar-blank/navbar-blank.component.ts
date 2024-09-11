import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { Iuser } from '../../core/interfaces/iuser';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar-blank.component.html',
  styleUrl: './navbar-blank.component.scss'
})
export class NavbarBlankComponent {
  UserInfo:Iuser={}as Iuser 
  ngOnInit(): void {
    this.getUserInfo()
  }
_AuthService=inject(AuthService)

logoutsubmit(){
  this._AuthService.logout()
}

getUserInfo(){
  this._AuthService.UserInfo().subscribe({
    next:(res)=>{
      this.UserInfo=res.user
      console.log(res)
    }
  })
}
}
