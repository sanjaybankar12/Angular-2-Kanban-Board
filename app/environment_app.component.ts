import {Component, View} from "angular2/core";
import {HeaderComponent} from './header.component';
import {KanbanComponent} from './kanban.component';

@Component({
   selector: 'my-app',
   template:'<my-header></my-header><my-kanban></my-kanban>',
   directives:[HeaderComponent,KanbanComponent]
})

export class AppComponent {
	
}