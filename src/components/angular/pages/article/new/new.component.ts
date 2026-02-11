import { Component, inject } from "@angular/core";
import { NavbarComponent } from "../../../navbar/navbar.component";
import { SidebarComponent } from "../../../sidebar/sidebar.component";
import { QuillModule } from "ngx-quill";
import { FormsModule } from "@angular/forms";
import { ArticleService } from "../../../services/article.service";

@Component({
    selector : 'app-article-new',
    standalone: true,
    templateUrl: './new.component.html',
    imports: [
        NavbarComponent,
        SidebarComponent,
        QuillModule,
        FormsModule
    ]
    
    
})
export class NewArticleComponent {
    title = '';
    content = ''; 
    private articleService = inject(ArticleService);
  
  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],     
      ['link', 'image'],                                
      ['clean']                                         
    ]
  };

  createArticle() {
    this.articleService.createArticle(this.title, this.content).subscribe({
        next: (response) => {
            alert('Artikel berhasil dibuat!');
            window.location.href = `/profile`;
        },
        error: (error) => {
            console.error('Error membuat artikel:', error);
            alert('Gagal membuat artikel. Coba lagi nanti.');
        }
    }); 
  }

}