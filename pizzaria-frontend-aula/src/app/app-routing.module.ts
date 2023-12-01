import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './sistema/login/login.component';
import { IndexComponent } from './components/layout/index/index.component';
import { PessoaslistaComponent } from './components/pessoas/pessoaslista/pessoaslista.component';
import { PedidoslistaComponent } from './components/pedidos/pedidoslista/pedidoslista.component';
import { ItemslistaComponent } from './components/items/itemslista/itemslista.component';
import { SaboreslistaComponent } from './components/sabores/saboreslista/saboreslista.component';
import { FinalizarComponent } from './components/pedidos/finalizar/finalizar.component';
import { rotaguardGuard } from './guards/rotaguard.guard';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {
    path:'admin', component:IndexComponent,canActivate:[rotaguardGuard],children:[
      {path:'pessoas', component:PessoaslistaComponent},
      {path:'pedidos', component:PedidoslistaComponent},
      {path:'itens', component:ItemslistaComponent},
      {path:'sabores', component:SaboreslistaComponent},
      {path:'finalizar', component:FinalizarComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
