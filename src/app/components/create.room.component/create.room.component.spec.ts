import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Create.RoomComponent } from './create.room.component';

describe('Create.RoomComponent', () => {
  let component: Create.RoomComponent;
  let fixture: ComponentFixture<Create.RoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create.RoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create.RoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
