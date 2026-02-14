import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { LucideAngularModule, CircleQuestionMark } from "lucide-angular";
import { PostService } from "../../../.../../../../services/post.service";

@Component({
    selector: 'detail-card',
    templateUrl: './card.component.html',
    standalone: true,
    imports: [LucideAngularModule, CommonModule]
})


export class CardComponent {
    private postService = inject(PostService);
    @Input()
    data: {
        id: number,
        body: string,
        created_at: string,
        reaction_summary: {
            type: 'like' | 'dislike' | 'agree' | 'disagree' | 'helpful' | 'unhelpful' | 'upvote' | 'downvote',
            count: number
            is_active: boolean
        }[]
    } = {
            id: 0,
            body: '',
            created_at: '',
            reaction_summary: []

        };


    


    addReaction(postId: number, reactionType: string) {

        const oldSummary = JSON.parse(JSON.stringify(this.data.reaction_summary));


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


        this.data.reaction_summary = this.data.reaction_summary.map(r => {

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
        this.postService.addReaction(postId, reactionType).subscribe({
            next: (res) => {
                console.log('Reaksi berhasil diperbarui di server');
            },
            error: (err) => {
                this.data.reaction_summary = oldSummary;
                console.log('Gagal update ke server, balikin state lokal', err);
            }
        });
    }

    getReaction(type: string) {
        return this.data.reaction_summary?.find(r => r.type === type) || { count: 0, is_active: false };
    }


    readonly CircleQuestionMark = CircleQuestionMark;


}