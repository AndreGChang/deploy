import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sabores } from 'src/app/model/sabores';
import { ItemService } from 'src/app/services/item.service';
import { SaborService } from 'src/app/services/sabor.service';

@Component({
  selector: 'app-saboreslista',
  templateUrl: './saboreslista.component.html',
  styleUrls: ['./saboreslista.component.scss']
})
export class SaboreslistaComponent {
  lista: Sabores[] =[];
  listaFiltrada: Sabores[] =[];

  saborSelecionadoParaEdicao: Sabores = new Sabores();
  indiceSelecionadoParaEdicao!: number;

  @Output() retorno = new EventEmitter<Sabores>();
  @Input() modoLancamento: boolean = false;


  modalService = inject(NgbModal);
  saborService = inject(SaborService);
  termoBusca:string = "";

  constructor(){
    this.listAll();
  }


  listAll(){
    this.saborService.listAll().subscribe({
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
    this.saborSelecionadoParaEdicao = new Sabores();
    this.modalService.open(modal, { size: 'md' });
  }

  editar(modal:any, sabores: Sabores, indice: number) {
    this.saborSelecionadoParaEdicao = Object.assign({}, sabores);
    this.indiceSelecionadoParaEdicao = indice;
    this.modalService.open(modal, {size:"md"});
  }

  deletar(sabores: Sabores){
    this.saborService.deletar(sabores.id).subscribe({
      next: item =>{
        this.listAll();
      },
      error: erro =>{
        alert("nao e possivel deletar item associado a outrs registros");
      }
    });
  }

  addOuEditarPessoa(sabores: Sabores) {
    this.listAll();
    this.modalService.dismissAll();
  }

  filtrar() {
    if(this.termoBusca.length > 2){
      this.listaFiltrada = [];
      for(let i =0;i < this.lista.length; i++){
        for(let j =0; j < this.lista[i].nome.length;i++){
          if(this.lista[i].nome.toLowerCase().indexOf(this.termoBusca.toLowerCase()) >= 0){ //VERIFICANDO SE EXISTE O TRECHO DO TERMOBUSCA DENRO DO NOME DO OBJETO USUARIO
            this.listaFiltrada.push(this.lista[i]);
          }
        }

      }
    }else{
      this.listaFiltrada = this.lista;
    }
  }


  lancamento(sabores: Sabores){
    this.retorno.emit(sabores);
  }

}
