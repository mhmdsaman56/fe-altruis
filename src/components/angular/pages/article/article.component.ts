import { Component } from "@angular/core";
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";

@Component({
    selector : 'app-article',
    standalone: true,
    imports: [
        NavbarComponent,
        SidebarComponent
    ],
    templateUrl: './article.component.html'
})
export class ArticleComponent {
    
}