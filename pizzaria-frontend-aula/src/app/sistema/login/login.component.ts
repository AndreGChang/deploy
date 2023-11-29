import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/model/login';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from 'src/app/services/login.service';
import { AuthTokenService } from 'src/app/shared/auth-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

login : Login = new Login();
roteador = inject(Router);
loginService = inject(LoginService);
authToken = inject(AuthTokenService);

constructor() {
  this.authToken.removerToken();
}

logar(){
  this.loginService.logar(this.login).subscribe({
    next: response =>{
      console.log('Login bem-sucedido', response);
      this.authToken.addToken(response.token);
      setTimeout(() => this.roteador.navigate(['/admin/pedidos']), 2000)
    },
    error: error =>{
      alert('teste');
      console.error('Erro no login', error);
    }
  });
}

}
