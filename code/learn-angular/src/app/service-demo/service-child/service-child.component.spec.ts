import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceChildComponent } from './service-child.component';

describe('ServiceChildComponent', () => {
  let component: ServiceChildComponent;
  let fixture: ComponentFixture<ServiceChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
