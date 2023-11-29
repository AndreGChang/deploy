import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { OutletContext } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-itemslista',
  templateUrl: './itemslista.component.html',
  styleUrls: ['./itemslista.component.scss']
})
export class ItemslistaComponent {

  lista:Item[]=[];
  listaFiltrada: Item[]=[];

  itemSelecionadoParaEdicao: Item = new Item();
  indiceSelecionadoParaEdicao!: number;

  @Output() retorno = new EventEmitter<Item>();
  @Input() modoLancamento: boolean = false;
  @Input() modo!: boolean;

  modalService = inject(NgbModal);
  itemService = inject(ItemService);
  termoBusca:string = "";
  modalRef!: NgbModalRef;

  constructor(private toastSvc: ToastrService){
    this.listAll();
  }


  listAll(){
    this.itemService.listAll().subscribe({
      next: lista =>{
        this.lista = lista;
        this.listaFiltrada = lista;
      },
      error: error =>{
        alert('Exemplo de tratamento de err/exception! Erro no console');
        console.error(error);
      }
    });
  }

  adicionar(modal: any) {
    this.itemSelecionadoParaEdicao = new Item();
    this.modalRef = this.modalService.open(modal, { size: 'md' });

  }


  editar(modal:any, item: Item, indice: number) {
    this.itemSelecionadoParaEdicao = Object.assign({}, item);
    this.indiceSelecionadoParaEdicao = indice;
    this.modalRef =  this.modalService.open(modal, {size:"md"});
  }

  deletar(item: Item){
    this.itemService.deletar(item.id).subscribe({
      next: item =>{
        this.listAll();
        this.toastSvc.warning(`${item.nome} salvo com sucesso`,"PizzariaTOP",{
          closeButton:true,
          progressBar: true,
          tapToDismiss:true
        });
      },
      error: erro =>{
        alert("nao e possivel deletar item associado a outrs registros");
      }
    });
  }

  addOuEditarPessoa(item: Item) {
    this.listAll();
    this.modalRef.dismiss();
  }

  // filtrar() {
  //   if(this.termoBusca.length > 2){
  //     this.listaFiltrada = [];
  //     for(let i =0;i < this.lista.length; i++){
  //       for(let j =0; j < this.lista[i].nome.length;j++){
  //         if(this.lista[i].nome.toLowerCase().indexOf(this.termoBusca.toLowerCase()) >= 0){ //VERIFICANDO SE EXISTE O TRECHO DO TERMOBUSCA DENRO DO NOME DO OBJETO USUARIO
  //           this.listaFiltrada.push(this.lista[i]);
  //         }
  //       }

  //     }
  //   }else{
  //     this.listaFiltrada = this.lista;
  //   }
  // }

  filtrar() {
    if (this.termoBusca.length > 2) {
      this.listaFiltrada = this.lista.filter(item =>
        item.nome.toLowerCase().includes(this.termoBusca.toLowerCase())
      );
    } else {
      this.listaFiltrada = this.lista;
    }
  }

  lancamento(item: Item){
    this.retorno.emit(item);
  }

}
