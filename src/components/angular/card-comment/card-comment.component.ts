import { CommonModule } from "@angular/common";
import { Component, inject, Input, signal, type OnInit } from "@angular/core";
import { CircleQuestionMark, LucideAngularModule } from "lucide-angular";
import { FormsModule } from "@angular/forms";
import { PostService } from "../services/post.service";

@Component({
    selector: 'app-card-answer',
    standalone: true,
    templateUrl: './card-answer.component.html',
    imports: [
        CommonModule,
        LucideAngularModule,
        FormsModule
    ]
})
export class CardCommentComponent implements OnInit {
    private postService = inject(PostService);
    isOpen = signal(false);

    allAnswers = signal<{
        id: number, body: string, created_at: string, user: { id: number, name: string }, reaction_summary: {
            type: 'like' | 'dislike' | 'agree' | 'disagree' | 'helpful' | 'unhelpful' | 'upvote' | 'downvote',
            count: number
            is_active: boolean
        }[]
    }[]>([]);

    @Input() postId!: number;


    toggle() {
        this.isOpen.update(value => !value);
    }


    answerBody = signal<string>('');

    getReaction(answer: { reaction_summary: { type: string; count: number; is_active: boolean }[] }, type: string) {
        return answer.reaction_summary.find(r => r.type === type) || { count: 0, is_active: false };
    }

      addReaction(data: { id: number, body: string, created_at: string, user: { id: number, name: string }, reaction_summary: {
            type: 'like' | 'dislike' | 'agree' | 'disagree' | 'helpful' | 'unhelpful' | 'upvote' | 'downvote',
            count: number
            is_active: boolean
        }[] }, reactionType: string) {

        const oldSummary = JSON.parse(JSON.stringify(data.reaction_summary));


        const opposites: { [key: string]: string } = {
            'like': 'dislike',
            'dislike': 'like',
            'agree': 'disagree',
            'disagree': 'agree',
            'upvote': 'downvote',
            'downvote': 'upvote',
            'helpful': 'unhelpful',
            'unhelpful': 'helpful'
        };

        const enemyType = opposites[reactionType];


        data.reaction_summary = data.reaction_summary.map(r => {

            if (r.type === reactionType) {
                if (r.is_active) {
                    r.count--;
                    r.is_active = false;
                } else {
                    r.count++;
                    r.is_active = true;
                }
            }


            if (r.type === enemyType && !oldSummary.find((x: any) => x.type === reactionType).is_active) {
                if (r.is_active) {
                    r.count--;
                    r.is_active = false;
                }
            }

            return r;
        });


        this.postService.addReaction(data.id, reactionType).subscribe({
            next: (res) => {
                console.log('Reaksi berhasil diperbarui di server');
            },
            error: (err) => {
                data.reaction_summary = oldSummary;
                console.error('Gagal update ke server, balikin state lokal', err);
            }
        });
    }

    sendAnswer(postId: number) {
        this.postService.addAnswer(postId, this.answerBody()).subscribe({
            next: (res) => {

                this.getAllAnswers();
                this.answerBody.set(''); 

            },
            error: (err) => {
                console.error('Error submitting answer:', err);
            }
        });

    }
    getAllAnswers() {
        this.postService.getAllAnswers(this.postId).subscribe({
            next: (res) => {
                console.log('Answers fetched successfully', res);
                this.allAnswers.set(res.payload);
            },
            error: (err) => {
                console.error('Error fetching answers', err);
            }
        });
    }

    ngOnInit(): void {
        this.getAllAnswers();
    }

    readonly CircleQuestionMark = CircleQuestionMark;


}