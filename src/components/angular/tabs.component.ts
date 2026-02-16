import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, type AfterContentInit } from "@angular/core";
import { TabContentDirective } from "./tab-content.directive";
import { CommonModule } from "@angular/common";

@Component({
    selector : 'app-tabs',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tabs.component.html'
    
})

export class TabsComponent  {
  @Input
    className: string = 'justify-between';
      @Output()
  tabChange = new EventEmitter<string>();
      @Input()
      tabs: Array<{ label: string; id: string;}> = [];
      @Input()
    activeTab: string = '';

    @ContentChildren(TabContentDirective) contentTemplates!: QueryList<TabContentDirective>;
    
    setTab(tabName: string) {
        this.activeTab = tabName;
        this.tabChange.emit(tabName);
    }
    
}