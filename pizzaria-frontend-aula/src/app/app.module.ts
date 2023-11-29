import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './sistema/login/login.component';
import { IndexComponent } from './components/layout/index/index.component';
import { PessoaslistaComponent } from './components/pessoas/pessoaslista/pessoaslista.component';
import { PessoasdetailsComponent } from './components/pessoas/pessoasdetails/pessoasdetails.component';
import { HttpClientModule } from '@angular/common/http';
import { EnderecosdetailsComponent } from './components/enderecos/enderecosdetails/enderecosdetails.component';
import { PedidoslistaComponent } from './components/pedidos/pedidoslista/pedidoslista.component';
import { PedidosdetailsComponent } from './components/pedidos/pedidosdetails/pedidosdetails.component';
import { ItemslistaComponent } from './components/items/itemslista/itemslista.component';
import { ItemsdetailsComponent } from './components/items/itemsdetails/itemsdetails.component';
import { SaboreslistaComponent } from './components/sabores/saboreslista/saboreslista.component';
import { SaboresdetailsComponent } from './components/sabores/saboresdetails/saboresdetails.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';
import { FinalizarComponent } from './components/pedidos/finalizar/finalizar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { httpInterceptorProviders } from './interceptor/httpinterceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    IndexComponent,
    PessoaslistaComponent,
    PessoasdetailsComponent,
    EnderecosdetailsComponent,
    PedidoslistaComponent,
    PedidosdetailsComponent,
    ItemslistaComponent,
    ItemsdetailsComponent,
    SaboreslistaComponent,
    SaboresdetailsComponent,
    FinalizarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
