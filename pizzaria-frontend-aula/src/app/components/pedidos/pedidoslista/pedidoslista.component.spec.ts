import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoslistaComponent } from './pedidoslista.component';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from 'src/app/services/pedido.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Pedido } from 'src/app/model/pedido';

describe('PedidoslistaComponent', () => {
  let component: PedidoslistaComponent;
  let fixture: ComponentFixture<PedidoslistaComponent>;
  let mockPedidoService: jasmine.SpyObj<PedidoService>;
  let mockModalService: jasmine.SpyObj<NgbModal>;


  beforeEach(async () => {
    mockPedidoService = jasmine.createSpyObj('PedidoService', ['listAll', 'deletar']);
    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);

    // Mock para listAll e deletar
    mockPedidoService.listAll.and.returnValue(of([]));
    mockPedidoService.deletar.and.returnValue(of("deletado"));

    await TestBed.configureTestingModule({
      declarations: [ PedidoslistaComponent ],
      imports: [ HttpClientTestingModule, NgbModalModule ],
      providers: [
        { provide: PedidoService, useValue: mockPedidoService },
        { provide: NgbModal, useValue: mockModalService }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoslistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call listAll method and set lista and listaFiltrada', () => {
    const mockPedidos = [new Pedido(), new Pedido()];
    mockPedidoService.listAll.and.returnValue(of(mockPedidos));
    component.listAll();
    expect(component.lista).toEqual(mockPedidos);
    expect(component.listaFiltrada).toEqual(mockPedidos);
  });

  it('should delete a pedido and refresh the list', () => {
    spyOn(component, 'listAll');
    const pedido = new Pedido();
    pedido.id = 1;
    component.deletar(pedido);
    expect(mockPedidoService.deletar).toHaveBeenCalledWith(pedido.id);
    expect(component.listAll).toHaveBeenCalled();
  });

  it('should open modal on add', () => {
    const mockModalRef = {};
    mockModalService.open.and.returnValue(mockModalRef as any);
    component.adicionar('mockModalContent');
    expect(mockModalService.open).toHaveBeenCalledWith('mockModalContent', { size: 'lg' });
  });

  it('should filter the pedidos correctly', () => {
    component.lista = [new Pedido(), new Pedido()];
    component.lista[0].usuario = { id:1, nome: 'John Doe', telefone:"123",cpf:"123",enderecos:[],username:'123',role:'USER',token:'qwe' };
    component.lista[1].usuario = { id:1, nome: 'John Doe', telefone:"323",cpf:"123",enderecos:[],username:'123',role:'USER',token:'qwe' };
    component.termoBusca = 'John';
    component.filtrar();
    expect(component.listaFiltrada.length).toBe(2);
    expect(component.listaFiltrada[0].usuario.nome).toContain('John');
  });



});
