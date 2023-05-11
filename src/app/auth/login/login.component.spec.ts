import { TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component"
import { AuthService } from "../services/auth.service";
import { AuthServiceMock } from "../mocks/auth-service.mock";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { MatInputModule } from "@angular/material/input";


describe('Pruebas en LoginComponent', () => {
    let component: LoginComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                LoginComponent
            ],
            imports: [
                BrowserAnimationsModule,
                HttpClientModule,
                MatCardModule,
                MatFormFieldModule,
                MatInputModule,
                ReactiveFormsModule,
                SharedModule
            ],
            providers: [
                {
                    provide: AuthService,
                    useClass: AuthServiceMock
                }
            ]
        }).compileComponents();
        const fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('Si el campo "Correo electrónico" está vacío, su FormControl debe ser inválido', () => {
        component.loginForm.setValue({email: null, password: null})
        expect(component.emailControl.invalid).toBeTrue();
    })

    it('Si el campo "Contraseña" está vacío, su FormControl debe ser inválido', () => {
        component.loginForm.setValue({ email: null, password: null })
        expect(component.passwordControl.invalid).toBeTrue();
      });
    
      it('Si el loginForm es inválido, debe marcar todos los controles como touched', () => {
        component.loginForm.setValue({ email: null, password: null })
        const spyOnMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched');
    
        component.onSubmit();
    
        expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
      });
    
      it('Si el loginForm es válido, debe llamar al método login del AuthService', () => {
        component.loginForm.setValue({ email: 'admin@email.com', password: '12345678' });
        const spyOnAuthServiceLogin = spyOn(TestBed.inject(AuthService), 'login');
        component.onSubmit();
        expect(component.loginForm.valid).toBeTrue();
        expect(spyOnAuthServiceLogin).toHaveBeenCalled();
      });
})