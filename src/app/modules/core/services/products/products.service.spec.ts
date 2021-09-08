import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';
import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

fdescribe('ProductsService', () => {
  let service: ProductsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    // Inicializamos las variables con los mocks de pruebas
    service = TestBed.inject(ProductsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Method getAllProducts', () => {
    it('should return products', () => {
      // Arrange => Lo que esperamos de la respuesta
      const expectData = [
        {
          id: 'abe',
          image: 'path',
          title: 'title',
          price: 23,
          description: 'description',
        },
        {
          id: 'cgt',
          image: 'path',
          title: 'title',
          price: 40,
          description: 'description',
        },
      ];
      let dataError: any;
      let dataResponse: any;
      // Act => Resolver o ejecutar los metodos a probar
      service.getAllProducts().subscribe(
        (response) => (dataResponse = response),
        (err) => (dataError = err)
      );
      const req = httpTestingController.expectOne(
        `${environment.URL_API}/products`
      );
      req.flush(expectData);
      // Assert => Resolver nuestra hipotesis de que si era lo que esperabamos
      expect(dataResponse.length).toEqual(2);
      expect(req.request.method).toEqual('GET');
      expect(dataError).toBeUndefined();
    });
  });
});
