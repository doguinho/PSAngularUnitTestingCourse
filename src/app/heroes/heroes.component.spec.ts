import { of } from "rxjs/internal/observable/of";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component"

describe('Heroes', () => {

    let component:HeroesComponent;
    let mockService;
    let HEROES:Hero[];
    
    beforeEach(() => {
        HEROES = [
            {id:1,name:"Bombasto",strength:19},
            {id:2,name:"Shining Star",strength:12},
            {id:3,name:"The Rock",strength:20},
        ];

        
        mockService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero','xyz']);        component = new HeroesComponent(mockService);
        component.heroes = HEROES;
    });

    it ('remove the selected hero from the heroes list', () => {
        mockService.deleteHero.and.returnValue(of(HEROES[2]));
        component.delete(HEROES[2]);
        expect(component.heroes.length).toBe(2);
    });

    it ('should call deleteHero', () => {
        mockService.deleteHero.and.returnValue(of(HEROES[2]));
        component.delete(HEROES[2]);
        expect(mockService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        const newHeroes = component.heroes.includes(HEROES[2]);
        expect(newHeroes).toBeFalsy();
    });

})