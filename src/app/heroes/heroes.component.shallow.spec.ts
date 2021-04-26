import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe('Heroes component (shallow)', () => {

    let fixture:ComponentFixture<HeroesComponent>;
    let mockHeroService;
    const HEROES:Hero[] = [
        {id:1,name:'Bomba',strength:15},
        {id:2,name:'Pancada',strength:15},
        {id:3,name:'Soco',strength:10},
    ]
    
    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(
            ['getHeroes','addHero','deleteHero']
            )
        TestBed.configureTestingModule({
            declarations:[HeroesComponent],
            providers:[{
                provide:HeroService, useValue: mockHeroService
            }],
            schemas:[NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should do nothing', () => {
        expect(mockHeroService.getHeroes.and.returnValue(of(HEROES)))
        fixture.detectChanges();        
        // expect(fixture).toBe(true);
        expect(fixture.componentInstance.heroes.length).toBe(3); 
    });


});