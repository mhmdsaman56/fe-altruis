import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import  { SidebarStore } from "./sidebar.store";



@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    
    
    constructor(public sidebar: SidebarStore) {}

    
    logout(){
        localStorage.removeItem('access_token');
        document.cookie = `auth_token=; path=/; max-age=0; SameSite=Strict`;

        window.location.href = '/login';
    }
    get currentPath() {
        return window.location.pathname;
    }
}