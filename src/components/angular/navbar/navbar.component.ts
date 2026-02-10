import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { SidebarStore } from "../sidebar/sidebar.store";
import { LucideAngularModule, Settings, User, Bell} from "lucide-angular";

@Component({
    selector : 'app-navbar',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './navbar.component.html',
    styles: [`
        :host {
            display: block;
            width: 100%;
        }
    `]
})
export class NavbarComponent {
   constructor(private sidebar: SidebarStore) {}

  toggle() {
    this.sidebar.toggle(); 
  }

  

  readonly Settings = Settings;
    readonly User = User;
    readonly Bell = Bell;


}