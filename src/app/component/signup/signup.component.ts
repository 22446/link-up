import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
   _SignUpServices=inject(AuthService)
   _FormBuilder=inject(FormBuilder)
   _Router=inject(Router)
    RegisterGroup:FormGroup=this._FormBuilder.group({
    name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email : [null,[Validators.required,Validators.email]],
    password : [null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    rePassword:[null,[Validators.required]],
    dateOfBirth:[null,[Validators.required]],
    gender:[null,[Validators.required]]
  },{validators:this.passwordMatchValidator})

   passwordMatchValidator(g: AbstractControl)
    {
    if(g.get('password')?.value === g.get('rePassword')?.value){
      return null
    }else
       return  {mismatch : true};
    }

    SubmitRegister(){
      if(this.RegisterGroup.valid){
      this._SignUpServices.signUpServfunc(this.RegisterGroup.value).subscribe(
      {

        next:(res)=>{
          console.log(res)
          this._Router.navigate(['/login'])

        },error:(err)=>{
          console.log(err.error)
        }

      })
    }
  }
}
