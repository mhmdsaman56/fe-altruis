import { Component } from "@angular/core";
import { NavbarComponent } from "../../../navbar/navbar.component";
import { SidebarComponent } from "../../../sidebar/sidebar.component";

@Component({
    selector : 'app-saved',
    standalone: true,
    imports: [
        NavbarComponent,
        SidebarComponent
    ],
    templateUrl: './saved.component.html'
})
export class SavedComponent {
    
}