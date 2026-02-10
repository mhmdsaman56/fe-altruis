import { Component, ContentChildren, Input, QueryList, type AfterContentInit } from "@angular/core";
import { TabContentDirective } from "./tab-content.directive";
import { CommonModule } from "@angular/common";

@Component({
    selector : 'app-tabs',
    standalone: true,
    imports: [CommonModule],
    template: `<div class="flex justify-between">
    <button
    *ngFor="let tab of tabs"
    (click)="setTab(tab.id)"
    class="pb-3  border-b-2
           hover:text-black hover:border-gray-300 transition"
    [ngClass]=" activeTab === tab.id ?
      'border-red-700 text-black font-semibold': 
      'border-transparent text-gray-500'
    "
  >
    {{ tab.label }}
  </button>
</div>

<div class="mt-3">
   <ng-container *ngFor="let content of contentTemplates">
        <ng-container *ngIf="content.tabId === activeTab">
          <ng-container [ngTemplateOutlet]="content.template"></ng-container>
        </ng-container>
      </ng-container>
</div>
`
    
})

export class TabsComponent implements AfterContentInit {
  
      @Input()
      tabs: Array<{ label: string; id: string;}> = [];
    activeTab: string = '';

    @ContentChildren(TabContentDirective) contentTemplates!: QueryList<TabContentDirective>;


    
    ngAfterContentInit() {
    if (this.tabs.length > 1) {
      this.activeTab = this.tabs[1].id;
    }
  }
    setTab(tabName: string) {
        this.activeTab = tabName;
    }
    
}