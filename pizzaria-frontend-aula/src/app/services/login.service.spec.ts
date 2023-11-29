import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Login } from '../model/login';
import { Usuario } from '../model/usuario';

describe('LoginService', () => {
  let service: LoginService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    service = TestBed.inject(LoginService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify(); // Verifica se não há requisições pendentes
  });

  it('deve enviar uma requisição POST para logar', () => {
    const mockLogin: Login = { username: 'user', password: 'pass' };
    const mockResponse: Usuario = { id:1,nome:"teste",telefone:'1234',cpf:'123',enderecos:[],username:'teste',role:'USER',token:'' };

    service.logar(mockLogin).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpController.expectOne(service.API);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockLogin);
    req.flush(mockResponse);
  });

  it('deve enviar uma requisição GET para deslogar', () => {
    service.deslogar().subscribe(response => {
      expect(response).toBeTruthy(); // ou alguma outra expectativa relevante
    });

    const req = httpController.expectOne(service.API + '/deslogar');
    expect(req.request.method).toBe('GET');
    req.flush({}); // Simula uma resposta vazia ou alguma resposta esperada
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
