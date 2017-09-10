import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTaskAssignedByYouComponent } from './all-task-assigned-by-you.component';

describe('AllTaskAssignedByYouComponent', () => {
  let component: AllTaskAssignedByYouComponent;
  let fixture: ComponentFixture<AllTaskAssignedByYouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTaskAssignedByYouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTaskAssignedByYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
