import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarComponent } from './finalizar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

describe('FinalizarComponent', () => {
  let component: FinalizarComponent;
  let fixture: ComponentFixture<FinalizarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalizarComponent],
      imports: [HttpClientTestingModule, FormsModule, ToastrModule.forRoot()],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(FinalizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
