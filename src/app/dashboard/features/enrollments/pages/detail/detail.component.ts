import { Component } from '@angular/core';
import { EnrollmentModel } from '../../models/enrollment';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  enrollment: EnrollmentModel | undefined;

  private subject$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private enrollmentService: EnrollmentService
  ){
    this.enrollmentService.getEnrollmentById(
      parseInt(this.activatedRoute.snapshot.params['id'])
    ).pipe(
      takeUntil(this.subject$)
    ).subscribe((enrollment) => {
      if(enrollment) this.enrollment = enrollment
    });
  }

  ngOnDestroy(): void {
    this.subject$.next(true);
  }
}
