import { TestBed } from "@angular/core/testing";

import { DashboardService } from "./dashboard.service";
import { HttpClient, provideHttpClient } from "@angular/common/http";

import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { entradas } from "../../../__mocks__/entradas";
import { Entrada } from "../../entradas/model/entrada.model";
import { environment } from "../../../../environments/environment.development";

describe("DashboardService", () => {
  let service: DashboardService;
  let httpTestingController: HttpTestingController;
  const baseUrl = environment.url;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DashboardService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("creates service", () => {
    expect(service).toBeTruthy();
  });
});
