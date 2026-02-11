import { CommonModule } from "@angular/common";
import { Component, inject, signal, type OnInit } from "@angular/core";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { NavbarComponent } from "../../navbar/navbar.component";
import { TabContentDirective } from "../../tab-content.directive";
import { TabsComponent } from "../../tabs.component";
import { QuillModule } from "ngx-quill";
import { ArticleService } from "../../services/article.service";
@Component({
    selector : 'app-profile',
    standalone: true,
    imports : [QuillModule, CommonModule, NavbarComponent, SidebarComponent,TabsComponent, TabContentDirective ],
    templateUrl: './profile.component.html',
    
    
})
export class ProfileComponent implements OnInit {

    tabs = [
        { label: 'Answers', id: 'answers' },
        { label: 'Articles', id: 'articles' },
        { label: 'Media', id: 'media' }
    ];

    content = ''; 

  
  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // Formatting teks
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // List
      ['link', 'image'],                                // Media
      ['clean']                                         // Hapus format
    ]
  };

  private articleService = inject(ArticleService);
  articles = signal<{id: number, title: string, slug: string, content: string}[]>([]);

    ngOnInit(): void {
        this.articleService.getUserArticles().subscribe({
            next: (res) => {
                console.log('User articles fetched successfully', res);
                this.articles.set(res.payload);
                console.log(this.articles);
            },
            error: (err) => {
                console.error('Error fetching user articles', err);
            }
        });
    }
}