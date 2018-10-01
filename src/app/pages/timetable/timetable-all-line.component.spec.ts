import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableAllLineComponent } from './timetable-all-line.component';

describe('TimetableAllLineComponent', () => {
  let component: TimetableAllLineComponent;
  let fixture: ComponentFixture<TimetableAllLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetableAllLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableAllLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
