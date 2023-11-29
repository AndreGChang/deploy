import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-pessoaslista',
  templateUrl: './pessoaslista.component.html',
  styleUrls: ['./pessoaslista.component.scss']
})
export class PessoaslistaComponent {

  @Input() modoLancamento = false;
  @Output() usuarioRetorno = new EventEmitter<Usuario>();

  lista: Usuario[] = [];
  listaFiltrada: Usuario[] = [];

  usuarioSelecionadoParaEdicao: Usuario = new Usuario();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  usuarioService = inject(UsuarioService);
  termoBusca: string = "";

  constructor(private toastSvc: ToastrService) {
    this.listAll();
  }

  listAll() {
    this.usuarioService.list().subscribe({
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
    this.usuarioSelecionadoParaEdicao = new Usuario();
    this.modalService.open(modal, { size: 'md' });
  }

  editar(modal:any, usuario: Usuario, indice: number) {
    this.usuarioSelecionadoParaEdicao = Object.assign({}, usuario);
    this.indiceSelecionadoParaEdicao = indice;
    this.modalService.open(modal, {size:"md"});
  }

  deletar(usuario : Usuario){
    this.usuarioService.deletar(usuario.id).subscribe(
      () =>{
        this.listAll();
        this.toastSvc.warning(`Endereco deletado`, "PizzariaTOP", {
          closeButton: true,
          progressBar: true,
          tapToDismiss: true
        });
      }
    )
  }

  addOuEditarPessoa(usuario: Usuario) {
    this.listAll();
    this.modalService.dismissAll();
  }

  filtrar() {
    if(this.termoBusca.length > 2){
      this.listaFiltrada = [];
      for(let i =0;i < this.lista.length; i++){
        if(this.lista[i].nome.toLowerCase().indexOf(this.termoBusca.toLowerCase()) >= 0){ //VERIFICANDO SE EXISTE O TRECHO DO TERMOBUSCA DENRO DO NOME DO OBJETO USUARIO
          this.listaFiltrada.push(this.lista[i]);
        }
      }
    }else{
      this.listaFiltrada = this.lista;
    }
  }

  lancamentoUsuario(usuario : Usuario){
    this.usuarioRetorno.emit(usuario);
  }

}
