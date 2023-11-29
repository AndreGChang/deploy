import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/model/item';
import { Pedido } from 'src/app/model/pedido';
import { Sabores } from 'src/app/model/sabores';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-itemsdetails',
  templateUrl: './itemsdetails.component.html',
  styleUrls: ['./itemsdetails.component.scss']
})
export class ItemsdetailsComponent{

  @Input() item: Item = new Item();
  @Output() retorno = new EventEmitter<Item>();
  @Input() modo!: boolean;

  itemService = inject(ItemService);
  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;

  options: string[] = ['Pequena', 'Media', 'Grande'];
  itemSelecionadoParaEdicao: Item = new Item();
  indiciSelecionadoParaEdicao!: number;

  constructor(private toastSvc: ToastrService){
    this.item.possuiSabores = false;
  }

  salvar(){
    this.itemService.verify(this.item).subscribe({
      next: item =>{
        this.retorno.emit(item);
        this.toastSvc.success(`${this.item.nome} salvo com sucesso`,"PizzariaTOP",{
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
    })
  }

  abrirModal(modal : any){
    this.modalRef = this.modalService.open(modal, {size:"lg"});
  }

  deletar(sabor : Sabores, i:number) {
    this.toastSvc.warning(`item deletado`,"PizzariaTOP",{
      closeButton:true,
      progressBar: true,
      tapToDismiss:true
    });
    this.item.sabores.splice(i,1);
  }


  retornoSaboresLista(sabor: Sabores){
    if(this.item.sabores == null){
        this.item.sabores = [];
    }

    this.item.sabores.push(sabor);
    this.modalRef.dismiss();
  }

}
