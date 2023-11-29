import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaboreslistaComponent } from './saboreslista.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

describe('SaboreslistaComponent', () => {
  let component: SaboreslistaComponent;
  let fixture: ComponentFixture<SaboreslistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaboreslistaComponent],
      imports: [HttpClientTestingModule, FormsModule, ToastrModule.forRoot()],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(SaboreslistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
