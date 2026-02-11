import { Component, inject, Input, signal, type OnInit } from "@angular/core";
import { TabsComponent } from "../../../tabs.component";
import { CommonModule } from "@angular/common";
import { TabContentDirective } from "../../../tab-content.directive";
import { CardComponent } from "../../../card/card.component";
import { NavbarComponent } from "../../../navbar/navbar.component";
import { SidebarComponent } from "../../../sidebar/sidebar.component";
import { PostService } from "../../../services/post.service";
import { FormsModule } from "@angular/forms";
import { CardAnswerComponent } from "../../../card-answer/card-answer.component";

@Component({
    selector : 'app-home-detail',
    standalone: true,
    imports: [ CommonModule, TabsComponent, TabContentDirective, CardComponent, NavbarComponent, SidebarComponent ,FormsModule, CardAnswerComponent,],
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
        parent: {
            body: string
        }
       
    } >({
        id: 0,
        body: '',
        parent: {
            body: ''
        }
    });
    
  
    private postService = inject(PostService);

    ngOnInit(): void {
        this.detailDiscussion();
    }  

 
    

    addReaction(postId: number, reactionType: string) {

        this.postService.addReaction(postId, reactionType).subscribe({
            next: (res) => {
                
            },
            error: (err) => {
                console.error('Error adding reaction', err);
            }
        });
    }


     detailDiscussion() {
        console.log('Fetching detail for slug:', this.slug);
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