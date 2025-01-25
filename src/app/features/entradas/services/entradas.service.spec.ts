import { TestBed } from "@angular/core/testing";

import { EntradasService } from "./entradas.service";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { entradas } from "../../../__mocks__/entradas";
import { environment } from "../../../../environments/environment.development";
import { Entrada } from "../model/entrada.model";
import { provideHttpClient } from "@angular/common/http";

describe("EntradasService", () => {
  let service: EntradasService;
  let httpTestingController: HttpTestingController;
  let MOCKED_ENTRADAS = entradas;
  const endpoint = "entradas";
  const baseUrl = environment.url;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(EntradasService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  describe("getEntradas", () => {
    it("Deve bucar todas entradas", () => {
      let listaEntradas!: Entrada[];
      service.getEntradas().subscribe((res) => {
        listaEntradas = res;
      });

      const req = httpTestingController.expectOne(`${baseUrl}${endpoint}`);
      req.flush(MOCKED_ENTRADAS);
      expect(listaEntradas).toEqual(MOCKED_ENTRADAS);
    });
  });
});
