import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGraphComponent } from './menu-graph.component';

describe('MenuGraphComponent', () => {
  let component: MenuGraphComponent;
  let fixture: ComponentFixture<MenuGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
