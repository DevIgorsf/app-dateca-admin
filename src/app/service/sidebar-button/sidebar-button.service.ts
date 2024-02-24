import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarButtonService {
  private sidebarExpandedSubject = new BehaviorSubject<boolean>(true);
  sidebarExpanded$ = this.sidebarExpandedSubject.asObservable();

  constructor() {}

  toggleSidebar() {
    const currentState = this.sidebarExpandedSubject.getValue();
    this.sidebarExpandedSubject.next(!currentState);
  }
}
