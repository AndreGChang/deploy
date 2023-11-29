import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthTokenService } from '../shared/auth-token.service';

export const rotaguardGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthTokenService);
  let router = inject(Router);

  if(authService.getToken() == null){
    router.navigate(['/login'])
    return false;
  }else{
    return true;
  }
};
