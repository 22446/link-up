import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [],
  templateUrl: './navbar-blank.component.html',
  styleUrl: './navbar-blank.component.scss'
})
export class NavbarBlankComponent {
_AuthService=inject(AuthService)
logoutsubmit(){
  this._AuthService.logout()
}
}
