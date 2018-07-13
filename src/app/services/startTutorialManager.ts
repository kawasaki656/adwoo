import { Injectable } from '@angular/core';

@Injectable()
export class StartTutorialManager {
  private tipsComplete: boolean;
  private education: boolean;

  constructor() {}

  educationNeed(need: boolean): void {
    this.education = need;
  }

  isTipsComplited(): boolean {
    return this.tipsComplete;
  }

  isEducationNeeded(): boolean {
    return this.education;
  }

  complite(): void {
    this.education = false;
  }
}
