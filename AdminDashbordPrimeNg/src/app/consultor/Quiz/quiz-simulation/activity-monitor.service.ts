import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityMonitorService {
  private activitySubject = new Subject<string>();
  activity$ = this.activitySubject.asObservable();
  private clickCounter = 0;

  constructor() {
    window.addEventListener('blur', () => {
      this.clickCounter++;
      if (this.clickCounter <= 3) {
        const remainingTries = 3 - this.clickCounter;
        alert(`You clicked outside the site. ${remainingTries} tries left.`);
        this.reportActivity('click-outside-window');
        if (this.clickCounter === 3) {
          this.submitQuizAutomatically();
        }
      }
    });
  }

  reportActivity(activityType: string) {
    this.activitySubject.next(activityType);
  }

  submitQuizAutomatically() {
    this.reportActivity('automatic-quiz-submission');
  }
}
