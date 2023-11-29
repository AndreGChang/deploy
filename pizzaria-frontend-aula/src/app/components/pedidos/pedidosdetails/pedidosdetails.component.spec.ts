import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosdetailsComponent } from './pedidosdetails.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { PedidoService } from 'src/app/services/pedido.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';
import { Pedido } from 'src/app/model/pedido';
import { Item } from 'src/app/model/item';

describe('PedidosdetailsComponent', () => {
  let component: PedidosdetailsComponent;
  let fixture: ComponentFixture<PedidosdetailsComponent>;
  let mockPedidoService: jasmine.SpyObj<PedidoService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockModalService: jasmine.SpyObj<NgbModal>;

  beforeEach(async () => {
    mockPedidoService = jasmine.createSpyObj('PedidoService', ['verify']);
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error', 'warning']);
    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismiss']);

    await TestBed.configureTestingModule({
      declarations: [ PedidosdetailsComponent ],
      imports: [HttpClientTestingModule, FormsModule,NgbModule, ToastrModule.forRoot()],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: PedidoService, useValue: mockPedidoService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: NgbModal, useValue: mockModalService }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call verify method and handle success response', () => {
    const mockPedido = new Pedido();
    mockPedidoService.verify.and.returnValue(of(mockPedido));
    spyOn(component.retorno, 'emit');

    component.salvar();

    expect(mockPedidoService.verify).toHaveBeenCalledWith(component.pedido);
    expect(mockToastrService.success).toHaveBeenCalled();
    expect(component.retorno.emit).toHaveBeenCalledWith(mockPedido);
  });

  it('should call verify method and handle error response', () => {
    const error = new Error('Test Error');
    mockPedidoService.verify.and.returnValue(throwError(error));

    spyOn(component, 'salvar').and.callThrough();
    spyOn(console, 'log'); // Para capturar a chamada de console.log

    component.salvar();

    expect(mockToastrService.error).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(error); // Se você está logando o erro no console
  });

  it('should delete an item and show a warning toast', () => {
    const item = new Item();
    item.nome = 'Test Item';
    component.pedido.item = [item];

    component.deletar(item, 0);

    expect(component.pedido.item.length).toBe(0);
    expect(mockToastrService.warning).toHaveBeenCalledWith(`${item.nome} deletado`, "PizzariaTOP", jasmine.any(Object));
  });
  it('should open a modal for adding address', () => {
    component.adicionarEndereco('mockModalContent');
    expect(mockModalService.open).toHaveBeenCalledWith('mockModalContent', { size: 'lg' });
  });

  it('should open a modal for editing address', () => {
    const mockPedido = new Pedido();
    component.editarEndereco('mockModalContent', mockPedido, 0);
    expect(mockModalService.open).toHaveBeenCalledWith('mockModalContent', { size: 'lg' });
  });

});
