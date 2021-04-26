import { TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";


describe('HeroService',() => {

  let mockMessageService;
  let httpTestingController:HttpTestingController;
  let service:HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule(
      {
        imports: [HttpClientTestingModule],
        providers:[HeroService, {provide:MessageService, useValue:mockMessageService}]
      }
    );
    //criar um mock http client module
    //HttpTestingController controla o HttpClient
    // ao invés de criar um component usando Testbed, como o teste é feito num service
    // usa-se o get() para acessar as dependencies injections
  
    // get vai procurar um injection com o tipo passado como parametro, e ancontrar o serviço
    httpTestingController = TestBed.get(HttpTestingController);
    // outro jeito de pegar o serviço de mensagem
    // let messageService = TestBed.get(MessageService);
    service = TestBed.get(HeroService);

  }) 

  describe('getHero', () => {
    it('should call get with the correct URL', () => {
      service.getHero(4).subscribe();
      // usando o httpTestingController e o método flush() vai retornar como resposta
      // o objeto passado como parametro
      // isso acontece antes do subscribe da linha 36 para que ele receba 
      // essa informação como resposta da requisição
      const req = httpTestingController.expectOne('api/heroes/4');
      req.flush({id:4, name:'SuperDude', strength:100});
    }) 



  })

 })