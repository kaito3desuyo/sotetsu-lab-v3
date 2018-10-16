import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableByStationComponent } from './timetable-by-station.component';

describe('TimetableByStationComponent', () => {
  let component: TimetableByStationComponent;
  let fixture: ComponentFixture<TimetableByStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetableByStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableByStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
