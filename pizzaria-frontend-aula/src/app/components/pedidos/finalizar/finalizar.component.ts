import { Component, Input, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Pedido } from 'src/app/model/pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrls: ['./finalizar.component.scss']
})
export class FinalizarComponent {

  @Input() pedido: Pedido = new Pedido();
  @Input() modo: boolean = false;
  @Input() finalizar!: string;

  pedidoService = inject(PedidoService);
  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;

  pedidoSelecionadoParaEdicao: Pedido = new Pedido();
  indiceSelecionadoParaEdicao!: number;

  constructor(){
    console.log(this.pedido.dataHora)
    this.pedido.status = "FINALIZADO"
  }
}
