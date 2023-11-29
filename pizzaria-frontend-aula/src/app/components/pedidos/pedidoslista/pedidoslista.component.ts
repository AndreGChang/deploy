import { Component, Input, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pedido } from 'src/app/model/pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedidoslista',
  templateUrl: './pedidoslista.component.html',
  styleUrls: ['./pedidoslista.component.scss']
})
export class PedidoslistaComponent {
  component: any;
  [x: string]: any;

  @Input() modoLancamento = false;

  lista: Pedido[] = [];
  listaFiltrada: Pedido[] = [];

  valor!: number;
  pedidoSelecionadoParaEdicao: Pedido = new Pedido();
  indiceSelecionadoParaEdicao!: number;


  modalService = inject(NgbModal);
  pedidoService = inject(PedidoService);
  termoBusca: string = "";

  constructor(){
    this.listAll();
  }

  listAll() {
    this.pedidoService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
        //this.listaFiltrada = Object.assign({}, lista);
        this.listaFiltrada  = lista;
      },
      error: error => {
        alert('Exemplo de tratamento de err/exception! Erro no console');
        console.error(error);
      }
    });
  }

  adicionar(modal: any) {
    this.pedidoSelecionadoParaEdicao = new Pedido();
    this.modalService.open(modal, { size: 'lg' });
  }

  editar(modal:any, pedido: Pedido, indice: number) {
    this.pedidoSelecionadoParaEdicao = Object.assign({}, pedido);
    this.indiceSelecionadoParaEdicao = indice;
    this.modalService.open(modal, {size:"lg"});
  }

  verMais(modal : any, pedido: Pedido){
    this.pedidoSelecionadoParaEdicao = Object.assign({}, pedido);
    this.modalService.open(modal, {size:"lg"});
  }

  verFinalizar(modal : any, pedido : Pedido, indice : number){
    this.pedidoSelecionadoParaEdicao = Object.assign({}, pedido);
    // this.indiceSelecionadoParaEdicao = indice;
    this.modalService.open(modal, {size:"lg"});
  }

  deletar(pedido: Pedido){
    this.pedidoService.deletar(pedido.id).subscribe(
      () =>{
        this.listAll();
      }
    )
  }

  addOuEditarPessoa(pedido: Pedido) {
    this.listAll();
    this.modalService.dismissAll();
  }

  filtrar() {
    if(this.termoBusca.length > 2){
      this.listaFiltrada = [];
      for(let i =0;i < this.lista.length; i++){
        if(this.lista[i].usuario?.nome.toLowerCase().indexOf(this.termoBusca.toLowerCase()) >= 0){ //VERIFICANDO SE EXISTE O TRECHO DO TERMOBUSCA DENRO DO NOME DO OBJETO USUARIO
          this.listaFiltrada.push(this.lista[i]);
        }
      }
    }else{
      this.listaFiltrada = this.lista;
    }
  }


}
