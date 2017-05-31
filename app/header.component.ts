import {Component, View} from "angular2/core";

@Component({
	selector:'my-header'
})

@View({
   template: '<div id="myHeader"><h3 class="text-success text-center">{{name}}</h3></div>'
})

export class HeaderComponent
{
	name:"Kanban Board Test Assignment Using Angular 2"
	
}