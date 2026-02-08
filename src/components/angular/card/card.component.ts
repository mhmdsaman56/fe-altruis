import { Component, Input } from "@angular/core";
import {LucideAngularModule,ThumbsUp, ThumbsDown, Check, X, CircleCheck,CircleX, ArrowBigUp, ArrowBigDown, MessageCircle} from "lucide-angular";

@Component({
    selector : 'app-card',
    templateUrl : './card.component.html',
    standalone: true,
    imports: [LucideAngularModule]
})


export class CardComponent {
    @Input()
    question: string = '';

    readonly ThumbsUp = ThumbsUp;
    readonly ThumbsDown = ThumbsDown;
    readonly Check = Check;
    readonly X = X;
    readonly ArrowBigUp = ArrowBigUp;
    readonly ArrowBigDown = ArrowBigDown;
    readonly CircleCheck = CircleCheck;
    readonly CircleX = CircleX;
    readonly MessageCircle = MessageCircle;

}