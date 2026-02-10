import { Component } from "@angular/core";
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";

@Component({
    selector : 'app-rooms',
    standalone: true,
    imports: [
        NavbarComponent,
        SidebarComponent
    ],
    templateUrl: './rooms.component.html'
})
export class RoomsComponent {
    
}