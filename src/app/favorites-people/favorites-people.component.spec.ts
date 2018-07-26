import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesPeopleComponent } from './favorites-people.component';

describe('FavouritesPeopleComponent', () => {
  let component: FavouritesPeopleComponent;
  let fixture: ComponentFixture<FavouritesPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritesPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
