import { Component } from "@angular/core";
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";

@Component({
    selector : 'app-notification',
    standalone: true,
    imports: [
        NavbarComponent,
        SidebarComponent
    ],
    templateUrl: './notification.component.html'
})
export class NotificationComponent {
    
}