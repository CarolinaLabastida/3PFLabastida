import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
authUser$: Observable<User | null>;

destroyed$ = new Subject<void>();

constructor(
  private authService: AuthService
){
  this.authUser$ = this.authService.getUser();
}

ngOnDestroy(): void {
  this.destroyed$.next();
  this.destroyed$.complete();
}

}
