import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

describe('Heroes component (deep)', () => {

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
            declarations:[
                HeroesComponent,
                HeroComponent
            ],
            providers:[{
                provide:HeroService, useValue: mockHeroService
            }],
            schemas:[NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });
    
    it ('should render each hero as a HeroComponent',  () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        //run ngOnInit
        fixture.detectChanges();
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponents.length).toEqual(3);
        // testing just one property of one instance
        expect(heroComponents[0].componentInstance.hero.name).toEqual('Bomba');
        //testing all instances
        for (let i=0;i<heroComponents.length;i++) {
            expect(heroComponents[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    });

    // TESTING DOM INTERACTION AND ROUTING COMPONENTS

    it(`should call heroService.deleteHero when 
    the Hero Component's delete button is clicked`, () => {
        //olhando o método delete
        spyOn(fixture.componentInstance,'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        //run ngOnInit
        fixture.detectChanges();

        // pega todos os componentes instantciados pelo for
        const heroComponents:DebugElement[] = fixture.debugElement.queryAll(By.directive(HeroComponent));
        // pega o primeiro componente da lista, pega o botão
        // dispara o evento click 
        // simula o stopPropagation porque está no método original
        heroComponents[0].query(By.css('button'))
            .triggerEventHandler('click',{stopPropagation: ()=>{}});

        //outra maneira de fazer é apenas mandar o 
        // componente filho emitir o evento clique para o pai
        (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

        // outra terceira maneira seria emitir o evento a partir debugelement 
        // sem ter que emitir o evento pelo componente filho
        heroComponents[0].triggerEventHandler('delete',null);

        // espera que o método delete tenha sido chamado com o parametro 
        // do primeiro elemento do array
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

    })

    it(`should add new hero to the hero list 
    when the add button is clicked`,() => {

        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        //run ngOnInit
        fixture.detectChanges();

        const name = 'Coelhão';
        mockHeroService.addHero.and.returnValue(of({id:5,name:name,strength:11}));
        const inputElement = fixture.debugElement.query(By.css('#heroName')).nativeElement;
        const addButton = fixture.debugElement.query(By.css('#addButton'));
        inputElement.value = name;
        addButton.triggerEventHandler('click',null);
        //precisa disparar evento para update the bindings
        fixture.detectChanges();
        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain(name);

    })

    // it('should do nothing', () => {
    //     expect(mockHeroService.getHeroes.and.returnValue(of(HEROES)))
    //     fixture.detectChanges();        
    //     expect(fixture.componentInstance.heroes.length).toBe(3); 
    // });


});