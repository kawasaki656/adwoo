import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesPeopleComponent } from './favorites-people.component';

describe('favoritesPeopleComponent', () => {
    let component: FavoritesPeopleComponent;
    let fixture: ComponentFixture<FavoritesPeopleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FavoritesPeopleComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FavoritesPeopleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});