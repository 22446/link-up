import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _PLATFORM_ID = inject(PLATFORM_ID)
  const _routes = inject(Router)
  if(isPlatformBrowser(_PLATFORM_ID)){
  if(localStorage.getItem('socialToken')===null){
    
    return true
  }else{
    _routes.navigate(['./timeline'])
    return false

    }
  }
  return false;
};
