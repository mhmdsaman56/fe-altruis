import { Injectable, signal } from "@angular/core";

@Injectable({providedIn: 'root'})
export class SidebarStore {
    private _open = signal(false);
    open = this._open.asReadonly();


    toggle() {
        console.log('toggling sidebar');
        this._open.update(value => !value);
    }
    openSidebar() {
    this._open.set(true);
  }

  closeSidebar() {
    this._open.set(false);
  }

}