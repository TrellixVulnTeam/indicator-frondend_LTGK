import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDialogBoxComponent } from './my-dialog-box.component';

describe('MyDialogBoxComponent', () => {
  let component: MyDialogBoxComponent;
  let fixture: ComponentFixture<MyDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDialogBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
