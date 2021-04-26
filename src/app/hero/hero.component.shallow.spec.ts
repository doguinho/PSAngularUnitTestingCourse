import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";

describe('blabla',() => {
    let fixture:ComponentFixture<HeroComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations:[HeroComponent],
            schemas:[NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent);
    });

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = {id:1, name:'Super Dude', strength:3}
        expect(fixture.componentInstance.hero.name).toEqual('Super Dude');
    });

    it('should render the correct hero name', () => {
        fixture.componentInstance.hero = {id:1, name:'Super Dude', strength:3};
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('Super Dude'); 
    })
});
