import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasdetailsComponent } from './pessoasdetails.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/model/usuario';
import { Endereco } from 'src/app/model/endereco';
import { of } from 'rxjs';

describe('PessoasdetailsComponent', () => {
  let component: PessoasdetailsComponent;
  let fixture: ComponentFixture<PessoasdetailsComponent>;
  let mockUsuarioService: jasmine.SpyObj<UsuarioService>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockToastService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    mockUsuarioService = jasmine.createSpyObj('UsuarioService', ['verify']);
    mockModalService = jasmine.createSpyObj('NgbModal', ['open']);
    mockToastService = jasmine.createSpyObj('ToastrService', ['success', 'error', 'warning']);

    await TestBed.configureTestingModule({
      declarations: [ PessoasdetailsComponent ],
      imports: [HttpClientTestingModule, FormsModule, ToastrModule, ReactiveFormsModule, NgbModule],
      providers: [
        FormBuilder,
        { provide: UsuarioService, useValue: mockUsuarioService },
        { provide: NgbModal, useValue: mockModalService },
        { provide: ToastrService, useValue: mockToastService }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoasdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('cpf')).toBeDefined();
    expect(component.form.get('telefone')).toBeDefined();
    expect(component.form.get('nome')).toBeDefined();
  });

  it('should validate CPF correctly', () => {
    let cpfControl = component.form.get('cpf');
    cpfControl?.setValue('123.456.78910');
    expect(cpfControl?.valid).toBeFalsy();  // Adapte de acordo com a regra do validador

    cpfControl?.setValue('123.456.789-10');
    expect(cpfControl?.valid).toBeTruthy();  // Adapte com um CPF válido
  });

  it('should validate telefone correctly', () => {
    let telefoneControl = component.form.get('telefone');
    telefoneControl?.setValue('123456789');
    expect(telefoneControl?.valid).toBeFalsy();

    telefoneControl?.setValue('+55119876543');
    expect(telefoneControl?.valid).toBeTruthy();
  });

  it('should save user data', () => {
    mockUsuarioService.verify.and.returnValue(of(new Usuario()));
    component.usuario = new Usuario();
    component.salvar();
    expect(mockUsuarioService.verify).toHaveBeenCalledWith(component.usuario);
    // Verificar se ToastrService foi chamado
  });

  it('should open modal for adding address', () => {
    component.adicionarEndereco('mockModalContent');
    expect(mockModalService.open).toHaveBeenCalledWith('mockModalContent', jasmine.any(Object));
  });

  // it('should set selected address for editing and open modal', () => {
  //   const mockEndereco = new Endereco();
  //   component.editarEndereco('mockModalContent', mockEndereco, 0);
  //   expect(component.enderecoSelecionadoParaEdicao).toEqual(mockEndereco);
  //   expect(mockModalService.open).toHaveBeenCalledWith('mockModalContent', jasmine.any(Object));
  // });

  it('should save user data and handle response correctly', () => {
    // Criando um mock de usuário e configurando o serviço para retornar esse usuário
    const mockUsuario = new Usuario();
    mockUsuario.nome = 'Test User';
    mockUsuarioService.verify.and.returnValue(of(mockUsuario));

    // Definindo o usuário no componente e chamando o método salvar
    component.usuario = mockUsuario;
    spyOn(component.retorno, 'emit'); // Espionando o evento de retorno
    component.salvar();

    // Verifica se o serviço foi chamado com o usuário correto
    expect(mockUsuarioService.verify).toHaveBeenCalledWith(mockUsuario);

    // Verifica se o ToastrService foi chamado com a mensagem de sucesso
    expect(mockToastService.success).toHaveBeenCalledWith(
      `${mockUsuario.nome} salvo com sucesso`,
      "PizzariaTOP",
      jasmine.any(Object)
    );

    // Verifica se o evento retorno foi emitido com o usuário
    expect(component.retorno.emit).toHaveBeenCalledWith(mockUsuario);
  });

});
