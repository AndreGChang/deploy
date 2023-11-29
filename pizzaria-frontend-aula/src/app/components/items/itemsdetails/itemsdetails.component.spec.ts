import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsdetailsComponent } from './itemsdetails.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/model/item';
import { of } from 'rxjs';
import { Sabores } from 'src/app/model/sabores';

describe('ItemsdetailsComponent', () => {
  let component: ItemsdetailsComponent;
  let fixture: ComponentFixture<ItemsdetailsComponent>;
  let mockItemService: jasmine.SpyObj<ItemService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockModalService: jasmine.SpyObj<NgbModal>;

  beforeEach(async () => {
    mockItemService = jasmine.createSpyObj('ItemService', ['verify']);
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error', 'warning']);
    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismiss']);

    let mockModalRef: Partial<NgbModalRef> = {
      dismiss: jasmine.createSpy('dismiss')
    };

    mockModalService.open.and.returnValue(mockModalRef as NgbModalRef);

    await TestBed.configureTestingModule({
      declarations: [ ItemsdetailsComponent ],
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
    fixture = TestBed.createComponent(ItemsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call verify method and handle success response', () => {
    const mockItem = new Item();
    mockItemService.verify.and.returnValue(of(mockItem));
    spyOn(component.retorno, 'emit');

    component.salvar();

    expect(mockItemService.verify).toHaveBeenCalledWith(component.item);
    expect(mockToastrService.success).toHaveBeenCalled();
    expect(component.retorno.emit).toHaveBeenCalledWith(mockItem);
  });

  it('should delete a sabor and show a warning toast', () => {
    const sabor = new Sabores();
    component.item.sabores = [sabor];

    component.deletar(sabor, 0);

    expect(component.item.sabores.length).toBe(0);
    expect(mockToastrService.warning).toHaveBeenCalled();
  });

  it('should open a modal', () => {
    component.abrirModal('mockModalContent');
    expect(mockModalService.open).toHaveBeenCalledWith('mockModalContent', { size: 'lg' });
  });

});
