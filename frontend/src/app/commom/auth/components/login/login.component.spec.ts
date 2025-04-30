import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { provideHttpClient } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthenticationService } from "../../service/authentication.service";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationServiceStup: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, BrowserAnimationsModule],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Botao de login desabilitado caso login e senha nao estejam preenchidos", () => {
    const botaoLogin = (HTMLButtonElement =
      fixture.nativeElement.querySelector(".btn-buscar"));
    expect(botaoLogin.disabled).toBe(true);
  });

  it("Botao de login habilitado caso login e senha estejam preenchidos", () => {
    component.loginForm.controls["email"].setValue("email@email.com");
    component.loginForm.controls["password"].setValue("1234");

    authenticationServiceStup = TestBed.inject(AuthenticationService);

    fixture.detectChanges();

    const botaoLogin = (HTMLButtonElement =
      fixture.nativeElement.querySelector(".btn-buscar"));
    expect(botaoLogin.disabled).toBe(false);
  });

  it("Deve chamar o metodo login do LoginComponent", () => {
    component.loginForm.controls["email"].setValue("email@email.com");
    component.loginForm.controls["password"].setValue("1234");

    authenticationServiceStup = TestBed.inject(AuthenticationService);
    fixture.detectChanges();

    const spy = jest.spyOn(authenticationServiceStup, "login");
    component.Login();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
});
