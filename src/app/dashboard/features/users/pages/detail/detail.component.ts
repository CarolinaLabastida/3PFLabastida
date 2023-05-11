import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { UserService } from '../../services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  user: User | undefined;

  private subject$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ){
    this.userService.getUserById(
      parseInt(this.activatedRoute.snapshot.params['id'])
    ).pipe(
      takeUntil(this.subject$)
    ).subscribe((user) => {
      if(user) this.user = user
    });
  }

  ngOnDestroy(): void {
    this.subject$.next(true);
  }
}
