import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTaskAssignedToYouComponent } from './all-task-assigned-to-you.component';

describe('AllTaskAssignedToYouComponent', () => {
  let component: AllTaskAssignedToYouComponent;
  let fixture: ComponentFixture<AllTaskAssignedToYouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTaskAssignedToYouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTaskAssignedToYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
