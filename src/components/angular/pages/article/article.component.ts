import { Component } from "@angular/core";
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { TabsComponent } from "../../tabs.component";
import { TabContentDirective } from "../../tab-content.directive";

@Component({
    selector : 'app-article',
    standalone: true,
    imports: [
        NavbarComponent,
        SidebarComponent,
                TabsComponent,
                TabContentDirective,
    ],
    templateUrl: './article.component.html'
})
export class ArticleComponent {

    tabs = [
        { label: 'Article Timeline', id: 'article_timeline' },
        { label: 'Saved Articles', id: 'saved_articles' },
        { label: 'Your Article', id: 'your_article' }
    ]

    articleTimelineTabs = [
        { label: 'All', id: 'all' },
        { label: 'Followed Creators', id: 'followed_creators' }
    ]
}