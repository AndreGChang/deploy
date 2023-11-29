import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';

import { AuthTokenService } from './auth-token.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from '../services/login.service';

describe('AuthTokenService', () => {
  let service: AuthTokenService;
  let loginService: jasmine.SpyObj<LoginService>;

  beforeEach(() => {
    loginService = jasmine.createSpyObj('LoginService', ['someMethod']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    service = TestBed.inject(AuthTokenService);
  });

  beforeEach(() => {
    let store: { [key: string]: string | undefined } = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string): string | null => {
      return store[key] ?? null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): void => {
      store[key] = value;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete store[key];
    });

    // ... (resto da configuração)
  });

  it('deve armazenar e recuperar o token', () => {
    const token = 'some-token';
    service.addToken(token);
    expect(service.getToken()).toBe(token);
  });

  it('deve remover o token do localStorage', () => {
    const token = 'some-token';
    service.addToken(token);
    service.removerToken();
    expect(service.getToken()).toBeNull();
  });

  it('deve verificar se o usuário tem permissão de ADMIN', () => {
    // Mock da função decodePayloadJWT para retornar um usuário com role 'ADMIN'
    spyOn(service, 'decodePayloadJWT').and.returnValue({ role: 'ADMIN' });

    expect(service.hasPermision('some-role')).toBeTrue();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
