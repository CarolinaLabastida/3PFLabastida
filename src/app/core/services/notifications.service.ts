import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private studentName$ = new Subject<string>();
  constructor() { }

  showMessage(): Observable<string> {
    return this.studentName$.asObservable();
  }

  createMessage(text: string): void {
    this.studentName$.next(text);
  }
}
