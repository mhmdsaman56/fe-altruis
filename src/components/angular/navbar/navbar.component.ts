import { Component, inject, signal, type OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { SidebarStore } from "../sidebar/sidebar.store";
import { LucideAngularModule, Settings, User, Bell } from "lucide-angular";
import { NotificationService } from "../services/notification.service";
import { EchoService } from "../services/echo.service";
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-navbar',
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
export class NavbarComponent implements OnInit {

    
    public sidebar = inject(SidebarStore);
    public echoService = inject(EchoService);
    public authService = inject(AuthService);

    toggle() {
        this.sidebar.toggle();
    }



    readonly Settings = Settings;
    readonly User = User;
    readonly Bell = Bell;
    data = signal<{ 
        unread_count: number,
        notifications : 
    {
        id: number,
        type: string,
        created_at: string,

    }[]}>({ notifications: [], unread_count: 0 });
    private notificationService = inject(NotificationService);
    public getCurrentNotification() {
        this.notificationService.getNotifications(5).subscribe({
            next: (res) => {
                this.data.set(res.payload);

            },
            error: (err) => {
                console.error('Error fetching notifications', err);
            }
        });
    }

    ngOnInit(): void {
        this.getCurrentNotification();
        const userId = localStorage.getItem('user_id')
        this.echoService.instance.private(`user.${userId}`).listen(
            'NotificationCreated', (e: any)=>{
             this.showToast('You have a new notification');
            }
        );
    }
      show = signal(false);
    message = signal('');

      showToast(msg: string) {
    this.message.set(msg);
    this.show.set(true);

    setTimeout(() => {
      this.show.set(false);
    }, 3000);
  }

}