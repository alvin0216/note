import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeCycleDemoComponent } from './life-cycle-demo.component';

describe('LifeCycleDemoComponent', () => {
  let component: LifeCycleDemoComponent;
  let fixture: ComponentFixture<LifeCycleDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeCycleDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeCycleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
