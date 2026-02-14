import { Component, inject, Input, signal, type OnInit } from "@angular/core";
import { TabsComponent } from "../../tabs.component";
import { CommonModule } from "@angular/common";
import { TabContentDirective } from "../../tab-content.directive";
import { CardComponent } from "../../card/card.component";
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { PostService } from "../../services/post.service";
import { FormsModule } from "@angular/forms";
import { CardAnswerComponent } from "../../card-answer/card-answer.component";

@Component({
    selector : 'app-home',
    standalone: true,
    imports: [ CommonModule, TabsComponent, TabContentDirective, CardComponent, NavbarComponent ,SidebarComponent,FormsModule, CardAnswerComponent],
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    tabs = [
        { label: 'Around You', id: 'around_you' },
        { label: 'Hyped Discussion', id: 'hyped_discussions' },
        { label: 'Customized By You', id: 'customized_by_you' }
    ];
    @Input() apiUrl!: string;

    private postService = inject(PostService);

    hypedDiscussions = signal<{ id: number, body: string, created_at: string, reaction_counts: { like: number; dislike: number; agree: number; disagree: number; helpful: number; unhelpful: number; upvote: number; downvote: number } }[]>([]);
    aroundYouDiscussions = signal<{ id: number, body: string, created_at: string, reaction_counts: { like: number; dislike: number; agree: number; disagree: number; helpful: number; unhelpful: number; upvote: number; downvote: number } }[]>([]);
    customizedByYouDiscussions = signal<{ id: number, body: string, created_at: string, reaction_counts: { like: number; dislike: number; agree: number; disagree: number; helpful: number; unhelpful: number; upvote: number; downvote: number } }[]>([]);
    
    body = signal<string>('');

    ngOnInit(): void {
        
        this.postService.getPosts().subscribe({
            next: (res) => {
                this.hypedDiscussions.set(res.payload);
                this.aroundYouDiscussions.set(res.payload);
                this.customizedByYouDiscussions.set(res.payload);
            },
            error: (err) => {
                console.error('Error fetching posts', err);
            }
        });

        
    }
    getPosts() {
        this.postService.getPosts().subscribe({
            next: (res) => {
                this.hypedDiscussions.set(res.payload);
                this.aroundYouDiscussions.set(res.payload);
                this.customizedByYouDiscussions.set(res.payload);
            },
            error: (err) => {
                console.error('Error fetching posts', err);
            }
        });
    }
    createDiscussion() {
        this.postService.createPost(this.body()).subscribe({
            next: (res) => {
                
                this.getPosts();
                this.body.set('');
            },
            error: (err) => {
                console.error('Error creating discussion', err);
            }
        });
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


     


}