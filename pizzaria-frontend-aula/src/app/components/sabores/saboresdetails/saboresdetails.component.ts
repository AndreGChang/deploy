import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Sabores } from 'src/app/model/sabores';
import { SaborService } from 'src/app/services/sabor.service';

@Component({
  selector: 'app-saboresdetails',
  templateUrl: './saboresdetails.component.html',
  styleUrls: ['./saboresdetails.component.scss']
})
export class SaboresdetailsComponent {

  @Input() sabor: Sabores = new Sabores();
  @Output() retorno = new EventEmitter<Sabores>;

  saborService = inject(SaborService);
  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;

  saborSelecionadoParaEdicao: Sabores = new Sabores();
  indiceSelecionadoParaEdicao!: number;

  constructor(private toastSvc: ToastrService){

  }


  salvar(){
    this.saborService.verify(this.sabor).subscribe({
      next: item =>{
        this.retorno.emit(item);
        this.toastSvc.success(`${item.nome} salvo com sucesso`, "PizzariaTOP", {
          closeButton: true,
          progressBar: true,
          tapToDismiss: true
        });
      },
      error: erro => {
        this.toastSvc.error(`${erro}`, "PizzariaTOP", {
          closeButton: true,
          progressBar: true,
          tapToDismiss: true
        });
        console.log(erro);
      }
    })
  }

}
