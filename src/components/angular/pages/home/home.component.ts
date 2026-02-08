import { Component } from "@angular/core";
import { TabsComponent } from "../../tabs.component";
import { CommonModule } from "@angular/common";
import { TabContentDirective } from "../../tab-content.directive";
import { CardComponent } from "../../card/card.component";

@Component({
    selector : 'app-post',
    standalone: true,
    imports: [CommonModule, TabsComponent, TabContentDirective, CardComponent],
    templateUrl: './home.component.html'
    
   
})
export class HomeComponent {
    tabs = [
        { label: 'Around you', id: 'arround_you' },
        { label: 'Viral Question', id: 'viral_question' },
        { label: 'Customized for you', id: 'customized_for_you' }
    ];
    questions = [
        "What are the most effective strategies for promoting mental health awareness in schools?",
        "How can technology be leveraged to improve access to education in remote areas?",
        "What role does community involvement play in successful environmental conservation efforts?",
        "How can we address the challenges of food insecurity in urban areas?",
        "What are the best practices for fostering inclusivity and diversity in the workplace?"
        
    ];
}