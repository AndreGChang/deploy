import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemslistaComponent } from './itemslista.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/model/item';
import { of } from 'rxjs';

describe('ItemslistaComponent', () => {
  let component: ItemslistaComponent;
  let fixture: ComponentFixture<ItemslistaComponent>;
  let mockItemService: jasmine.SpyObj<ItemService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockModalService: jasmine.SpyObj<NgbModal>;

  beforeEach(async () => {
    mockItemService = jasmine.createSpyObj('ItemService', ['listAll', 'deletar']);
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error', 'warning']);
    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismiss']);

    mockItemService.listAll.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      declarations: [ ItemslistaComponent ],
      imports: [HttpClientTestingModule, FormsModule, ToastrModule.forRoot()],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: ItemService, useValue: mockItemService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: NgbModal, useValue: mockModalService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemslistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call listAll method and set lista and listaFiltrada', () => {
    const mockItems = [new Item(), new Item()];
    mockItemService.listAll.and.returnValue(of(mockItems));

    component.listAll();

    expect(mockItemService.listAll).toHaveBeenCalled();
    expect(component.lista).toEqual(mockItems);
    expect(component.listaFiltrada).toEqual(mockItems);
  });

  it('should delete an item and show a warning toast', () => {
    const item = new Item();
    item.id = 1;
    item.nome = 'Test Item';
    mockItemService.deletar.and.returnValue(of(item));

    component.deletar(item);

    expect(mockItemService.deletar).toHaveBeenCalledWith(item.id);
    expect(mockToastrService.warning).toHaveBeenCalledWith(`${item.nome} salvo com sucesso`, "PizzariaTOP", jasmine.any(Object));
  });

  it('should open a modal for adding item', () => {
    component.adicionar('mockModalContent');
    expect(mockModalService.open).toHaveBeenCalledWith('mockModalContent', { size: 'md' });
  });

  it('should open a modal for editing item', () => {
    const mockItem = new Item();
    component.editar('mockModalContent', mockItem, 0);
    expect(mockModalService.open).toHaveBeenCalledWith('mockModalContent', { size: 'md' });
  });

  it('should filter the items correctly', () => {
    component.lista = [new Item(), new Item()];
    component.lista[0].nome = 'Test Item 1';
    component.lista[1].nome = 'Another Item';
    component.termoBusca = 'Test';
    component.filtrar();

    expect(component.listaFiltrada.length).toBe(1);
    expect(component.listaFiltrada[0].nome).toContain('Test');
  });



});
