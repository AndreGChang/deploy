import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, EventEmitter, Input, Output, inject, ElementRef, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Pedido } from 'src/app/model/pedido';
import { Usuario } from 'src/app/model/usuario';
import { PedidoService } from 'src/app/services/pedido.service';
import { Item } from 'src/app/model/item';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { PedidoslistaComponent } from '../pedidoslista/pedidoslista.component';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-pedidosdetails',
  templateUrl: './pedidosdetails.component.html',
  styleUrls: ['./pedidosdetails.component.scss'],

})

export class PedidosdetailsComponent {


  @Input() pedido: Pedido = new Pedido();
  @Output() retorno = new EventEmitter<Pedido>();
  @Input() modo: boolean = false;

  pedidoService = inject(PedidoService);
  modalService = inject(NgbModal);
  modalRef!: NgbModalRef

  pedidoSelecionadoParaEdicao: Pedido = new Pedido();
  indiceSelecionadoParaEdicao!: number;
  itemSelecionadoParaEdicao: Item = new Item();
  constructor(private toastSvc: ToastrService){

  }

  salvar() {
    console.log(this.pedido);
    this.pedidoService.verify(this.pedido).subscribe({
      next: usuario => {
        this.retorno.emit(usuario);
        this.toastSvc.success(`${this.pedido.usuario?.nome} salvo com sucesso`,"PizzariaTOP",{
          closeButton:true,
          progressBar: true,
          tapToDismiss:true
        });
      },
      error: erro => {
        this.toastSvc.error(`${erro}`,"PizzariaTOP",{
          closeButton:true,
          progressBar: true,
          tapToDismiss:true
        });
        console.log(erro);
      }
    });
  }

  adicionarEndereco(modal: any) {
    // this.pedidoSelecionadoParaEdicao = new Pedido();
    // this.indiceSelecionadoParaEdicao = -1;
    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  editarEndereco(modal: any, pedido: Pedido, indice: number) {
    this.pedidoSelecionadoParaEdicao = Object.assign({}, pedido);
    this.indiceSelecionadoParaEdicao = indice;
    this.modalRef = this.modalService.open(modal, { size: "lg" });
  }

  deletar(item: Item, i: number) {
    this.pedido.item.splice(i, 1);
    this.toastSvc.warning(`${item.nome} deletado`,"PizzariaTOP",{
      closeButton:true,
      progressBar: true,
      tapToDismiss:true
    });
  }


  retornoUsuarioSelecionado(usuario: Usuario) {
    this.pedido.usuario = usuario;
  }

  retornoItemLista(item: Item) {
    if (this.pedido.item == null) {
      this.pedido.item = [];
    }

    this.pedido.item.push(item);
    this.modalRef.dismiss();
  }

  lancarUsuario(modal: any) {
    this.modalRef = this.modalService.open(modal, { size: "lg" });
  }

  receberUsuario(usuario: Usuario) {
    this.pedido.usuario = usuario;
    this.modalRef.dismiss();
  }


  lancar(modal: any) {
    this.modalRef = this.modalService.open(modal, { size: "lg" });
  }

  verItens(modal: any, item: Item, indice:number) {
    this.itemSelecionadoParaEdicao = Object.assign({}, item);
    this.indiceSelecionadoParaEdicao = indice;
    console.log(this.itemSelecionadoParaEdicao);
    this.modalRef = this.modalService.open(modal, { size: "lg" })
  }

  opcoesSelect(item1: any, item2: any) {
    if (item1 != null && item2 != null)
      return item1.id === item2.id
    else
      return item1 === item2;
  }


}
