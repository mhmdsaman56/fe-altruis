import { Component } from "@angular/core";
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";

@Component({
    selector : 'app-analytics',
    standalone: true,
    imports: [
        NavbarComponent,
        SidebarComponent
    ],
    templateUrl: './analytics.component.html'
})
export class AnalyticsComponent {
    
}