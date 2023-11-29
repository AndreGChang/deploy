import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaslistaComponent } from './pessoaslista.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';
import { FormsModule } from '@angular/forms';


describe('PessoaslistaComponent', () => {
  let component: PessoaslistaComponent;
  let fixture: ComponentFixture<PessoaslistaComponent>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockUsuarioService: jasmine.SpyObj<UsuarioService>;
  let mockToastService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    mockUsuarioService = jasmine.createSpyObj('UsuarioService', ['list', 'deletar']);
    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    mockToastService = jasmine.createSpyObj('ToastrService', ['warning']);

    mockUsuarioService.list.and.returnValue(of([]));

    const usuarioMock: Usuario = new Usuario();

    mockUsuarioService.deletar.and.returnValue(of(usuarioMock));

    await TestBed.configureTestingModule({
      declarations: [PessoaslistaComponent],
      imports: [HttpClientTestingModule, FormsModule, ToastrModule],
      providers: [
        { provide: UsuarioService, useValue: mockUsuarioService },
        { provide: NgbModal, useValue: mockModalService },
        { provide: ToastrService, useValue: mockToastService }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PessoaslistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('chamar metodo listar', () => {
    expect(mockUsuarioService.list).toHaveBeenCalled();
  });

  it('abrir modal adicionar', () => {
    const mockModal = {}
    component.adicionar(mockModal);
    expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'md' });
    expect(component.usuarioSelecionadoParaEdicao).toEqual(new Usuario());
  });

  it('deve configurar usuarioSelecionadoParaEdicao e abrir o modal em editar', () => {
    const mockModal = {};
    let usuarioMock = new Usuario();
    usuarioMock.id = 1;
    usuarioMock.cpf = "213";

    component.editar(mockModal, usuarioMock, 0);

    // Verifica se as propriedades são iguais
    expect(component.usuarioSelecionadoParaEdicao.id).toEqual(usuarioMock.id);
    expect(component.usuarioSelecionadoParaEdicao.cpf).toEqual(usuarioMock.cpf);

    // Verifica se o modal foi aberto corretamente
    expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'md' });
  });

  it('deve chamar delete do UsuarioService em deletar', () => {
    const usuarioMock = new Usuario();
    usuarioMock.id = 1;
    component.deletar(usuarioMock);
    expect(mockUsuarioService.deletar).toHaveBeenCalledWith(usuarioMock.id);
    expect(mockToastService.warning).toHaveBeenCalled();
  });

  it('deve filtrar os usuários corretamente', () => {
    component.lista = [new Usuario(), new Usuario()];
    component.lista[0].nome = 'John';
    component.lista[1].nome = 'Jane';
    component.termoBusca = 'Jo';
    component.filtrar();
    expect(component.listaFiltrada.length).toBe(2);
    expect(component.listaFiltrada[0].nome).toContain('Jo');
  });

  it('deve emitir usuarioRetorno event em lancamentoUsuario', () => {
    spyOn(component.usuarioRetorno, 'emit');
    const usuarioMock = new Usuario();
    component.lancamentoUsuario(usuarioMock);
    expect(component.usuarioRetorno.emit).toHaveBeenCalledWith(usuarioMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
