import { Component, inject, signal, type OnInit } from "@angular/core";
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { TabsComponent } from "../../tabs.component";
import { CommonModule } from "@angular/common";
import { TabContentDirective } from "../../tab-content.directive";
import { NotificationService } from "../../services/notification.service";

@Component({
    selector : 'app-notification',
    standalone: true,
    imports: [
        CommonModule,
        NavbarComponent,
        SidebarComponent,
        TabsComponent,
        TabContentDirective,
    ],
    templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {
    tabs = [
        { label: 'Your Questions', id: 'your_questions' },
        { label: 'Your Answers', id: 'your_answers' },
        { label: 'Your Articles', id: 'your_articles' },
        { label: 'From Altru.is', id: 'from_altruis' }
    ];
 
    private notificationService = inject(NotificationService);
    currentTab = 'your_answers';
    data = signal<{
        id: number,
        type: string,
        created_at: string,
    }[]>([]);
    TAB_TYPE_MAP: Record<string, string > = {
  your_questions: 'answer',
  your_answers: 'comment',
  your_articles: 'article',
  from_altruis: 'system'
};
    onTabChange(tabId: string) {
  const type = this.TAB_TYPE_MAP[tabId];
  this.getNotificationsByTab(type);
}

    getNotificationsByTab(type: string) {
        
        this.notificationService.getNotifications( null,type).subscribe({
            next: (res) => {
                this.data.set(res.payload);
                
            },
            error: (err) => {
                console.error('Error fetching notifications', err);
            }
        });
    }
    ngOnInit(): void {
        this.getNotificationsByTab('comment');
    }
}
