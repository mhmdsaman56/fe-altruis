import { Component, inject, Input, signal, type OnInit } from "@angular/core";
import { TabsComponent } from "../../../tabs.component";
import { CommonModule } from "@angular/common";
import { TabContentDirective } from "../../../tab-content.directive";
import { CardComponent } from "./components/card/card.component";
import { NavbarComponent } from "../../../navbar/navbar.component";
import { SidebarComponent } from "../../../sidebar/sidebar.component";
import { PostService } from "../../../services/post.service";
import { FormsModule } from "@angular/forms";
import { CardAnswerComponent } from "./components/card-answer/card-answer.component";

@Component({
    selector : 'app-home-detail',
    standalone: true,
    imports: [ CommonModule, TabsComponent, TabContentDirective, CardComponent, NavbarComponent, SidebarComponent ,FormsModule, CardComponent,  CardAnswerComponent],
    templateUrl: './detail.component.html'
})
export class HomeDetailComponent implements OnInit {
    tabs = [
        { label: 'Around You', id: 'around_you' },
        { label: 'Hyped Discussion', id: 'hyped_discussions' },
        { label: 'Customized By You', id: 'customized_by_you' }
    ];

    @Input() slug!: string;
    data = signal<{
        id: number,
        body: string,
        created_at: string,
        reaction_summary: {
            type: 'like' | 'dislike' | 'agree' | 'disagree' | 'helpful' | 'unhelpful' | 'upvote' | 'downvote',
            count: number,
            is_active: boolean
        }[]
        
       
    } >({} as any);
    
  
    private postService = inject(PostService);

    ngOnInit(): void {
        this.detailDiscussion();
    }  


     detailDiscussion() {
        this.postService.detailDiscussion(this.slug).subscribe({
            next: (res) => {
                console.log('Discussion detail fetched successfully', res);
                this.data.set(res.payload);
            },
            error: (err) => {
                console.error('Error fetching discussion detail', err);
            }
        });
     }

     
}