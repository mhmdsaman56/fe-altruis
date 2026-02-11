import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  open = signal(false);

  toggle() {
    this.open.update(value => !value);
  }
}
