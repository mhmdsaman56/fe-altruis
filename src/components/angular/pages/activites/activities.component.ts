import { Component, computed, effect, inject, signal} from "@angular/core";
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { TabsComponent } from "../../tabs.component";
import { CommonModule } from "@angular/common";
import { TabContentDirective } from "../../tab-content.directive";
import { NotificationService } from "../../services/notification.service";
import { ActivityService } from "../../services/activity.service";


@Component({
    selector: 'app-activities',
    standalone: true,
    imports: [
        CommonModule,
        NavbarComponent,
        SidebarComponent,
        TabsComponent,
        TabContentDirective,
    ],
    templateUrl: './activities.component.html'
})
export class ActivitiesComponent  {


    reactionTabs = [
        { label: 'All', id: 'all' },
        { label: 'Liked', id: 'like' },
        { label: 'Disliked', id: 'dislike' },
        { label: 'Agreed', id: 'agree' },
        { label: 'Disagreed', id: 'disagree' },
        { label: 'Helpful', id: 'helpful' },
        { label: 'Unhelpful', id: 'unhelpful' },
        { label: 'Upvoted', id: 'upvote' },
        { label: 'Downvoted', id: 'downvote' },
    ];
    tabs = [
        {
            label: 'Questions', id: 'your_questions', interactionTabs: [
                { label: 'Reacted', id: 'reaction', reactionTabs: this.reactionTabs },
                { label: 'Answer & Comments', id: 'answer_comments' }
            ]
        },
        {
            label: 'Answers', id: 'your_answers', interactionTabs: [
                { label: 'Reactions', id: 'reaction', reactionTabs: this.reactionTabs },
                { label: 'Answer & Comments', id: 'answer_comments' }
            ]
        },
        {
            label: 'Articles', id: 'your_articles', interactionTabs: this.reactionTabs ,
            
        },
    ];



    private activityService = inject(ActivityService);
    activeMainTab = signal('your_questions');
    activeInteractionTab = signal('reaction');
    activeReactionTab = signal('all');

    data = signal<
            {
                id: number,
                type: string,
                reaction_type: string | null,
                interaction_type: string,
                created_at: string,
                data : {
                  content_body: string,
                }
            }[]
        >([] );
    TAB_TYPE_MAP: Record<string, string> = {
        your_questions: 'question',
        your_answers: 'answer',
        your_articles: 'article',
        from_altruis: 'system'
    };


    currentMainTab = computed(() => this.tabs.find(tab => tab.id === this.activeMainTab())!);
    currentInteractionTabs = computed(() => this.currentMainTab()?.interactionTabs ?? []);
    currentReactionTabs = computed(() => this.currentInteractionTabs()?.find(tab => tab.id === this.activeInteractionTab())?.reactionTabs ?? []);
    getActivitiesByTab(type: string, interactionType: string, reactionType: string | null = null) {

        this.activityService.getAllActivities(type, interactionType, reactionType).subscribe({
            next: (res) => {
                this.data.set(res.payload);
                console.log('Fetched activities for', { type, interactionType, reactionType }, res.payload);
                
            },
            error: (err) => {
                console.error('Error fetching activities', err);
            }
        });
    }

    constructor() {
        effect(() => {
            const tabId = this.activeMainTab();
            const type = this.TAB_TYPE_MAP[tabId] || 'answer';
            const interactionType = this.activeInteractionTab();
            const reactionType = this.activeReactionTab();
            this.getActivitiesByTab(type, interactionType, reactionType);

        });
    }
}
