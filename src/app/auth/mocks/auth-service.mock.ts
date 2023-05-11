import { BehaviorSubject, Observable, of } from "rxjs";
import { LoginFormValue, User } from "src/app/core/models/user";

export const USUARIO_ADMIN_MOCK: User = {
  id: 1,
  name: "Carolina",
  lastName: "Labastida",
  email: "admin@email.com",
  phone: "8331234567",
  role: "Administrador",
  password: "12345678",
  token: "67674d30-96b8-323d-0823-ce6d4c4f7931"
}

export class AuthServiceMock {

  private authUser$ = new BehaviorSubject<User | null>(null);

  login(formValue: LoginFormValue): void {
    this.authUser$.next(USUARIO_ADMIN_MOCK);
  }

  verificarToken(): Observable<boolean> {
    return of(true);
  }
}
