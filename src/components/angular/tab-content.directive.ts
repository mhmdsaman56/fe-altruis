import { Directive,  Input,  TemplateRef } from '@angular/core';

@Directive({

  selector: '[appTabContent]',
  standalone: true
})
export class TabContentDirective {
  @Input('appTabContent') tabId: string = '';

  
  constructor(public template: TemplateRef<any>) {}

  
}
