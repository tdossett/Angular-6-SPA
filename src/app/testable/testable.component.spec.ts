
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestableComponent } from './testable.component';

describe('TestableComponent', () => {
  let component: TestableComponent;
  let fixture: ComponentFixture<TestableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
