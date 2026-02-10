import { Component, inject, Input, signal, type OnInit } from "@angular/core";
import { NavbarComponent } from "../../../navbar/navbar.component";
import { SidebarComponent } from "../../../sidebar/sidebar.component";
import { ArticleService } from "../../../services/article.service";

@Component({
    selector : 'app-article-detail',
    standalone: true,
    imports: [
        NavbarComponent,
        SidebarComponent,
    ],
    templateUrl: './detail.component.html'
})
export class DetailArticleComponent implements  OnInit {
    @Input()
    slug: string | undefined;
    private articleService = inject(ArticleService);
    article =  signal<{id: number, title: string, slug: string, content: string}>({
        id: 0,
        content: '',
        slug:'',
        title:''
    });


    ngOnInit() {
         this.articleService.getDetailArticle(this.slug|| '').subscribe({
            next: (res) => {
                console.log('User articles fetched successfully', res);
                this.article.set(res.payload);
            },
            error: (err) => {
                console.error('Error fetching user articles', err);
            }
        });
        
    
    }
}
    