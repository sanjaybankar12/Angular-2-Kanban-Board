import {Component, View} from "angular2/core";
import {Task} from "./task";
import {TaskService} from "./task.service";

@Component({
	selector:'my-kanban'
	template:`<div id="kanban_board">
	<p>{{note}}</p>
	<ul class="ul-unstyle">
	<li *ngFor="#tsk of tasks">
	
		<h3 class="text-align:center;"><a (click)='newTask(tsk.name)'><i class="glyphicon glyphicon-plus"></i></a><span class="title">{{ tsk.name}}</span><select [(ngModel)]="sortval" (change)="sortTask(tsk.name)" class="form-control">
			<option value="1">By Due-Date</option>
			<option value="2">By Priority</option>
		</select></h3>
		<ul class="child_container_ul"><li *ngFor="#cards of tsk.cards">
			<div class="task_dblist">
				<a (click)='removeTask(tsk.name,cards.task_name)'><i class="glyphicon glyphicon-remove"></i></a>
				<strong>Task : <span class="task_nm">{{cards.task_name}}</span></strong>
				<hr/>
				<span class="date_prio"><strong>Due Date :</strong>{{cards.due_date}} , <strong>Priority :</strong> {{cards.priority | uppercase}}</span>
			</div>
			
		</li>
			
		</ul>
	
	</li></ul>	
		
		<div id="myForm" [hidden]="addTask">
			<form (ngSubmit)="onSubmit()" #taskForm="ngForm" novalidate>
				<strong>Add Task to <span>'{{tsktype}}'</span> Category : <input placeholder="Enter Task Name" #task_name="ngForm" [(ngModel)]='tname' ngControl="task_name" required class="form-control" type="text" /></strong>
				<span class="date_prio">Due Date : <input #due_date="ngForm" placeholder="Enter Due Date" [(ngModel)]='ddate' ngControl="due_date" required class="form-control" type="date" />
				Priority : <select [(ngModel)]='pri' ngControl="priority" #priority="ngForm" required class="form-control">
					<option selected value="high">High</option>
					<option value="medium">Medium</option>
					<option value="low">Low</option>
				</select></span>
				<p></p>
				<div class="text-center"><button type="submit" [disabled]="!taskForm.form.valid" class="text-center btn btn-primary">Add Task</button>&nbsp;&nbsp;<button (click)="hideForm()" type="button" class="text-center btn btn-danger">Close</button></div>
			 </form>
		</div>
	
	
	</div>`,
	providers: [TaskService]
	
})

export class KanbanComponent
{
	public tasks :Task[];
	public addTask=true;
	public tsktype="";
	public note="*To sort task of perticular category by Due Date and by Priority, Select element must change value. By default, Tasks are no sorted.";
    constructor(private _taskService: TaskService) {
		this.pri="high";
		this.ddate=new Date().toLocaleDateString();
		this.sortval=1;
	}

   getTasks(){
      this._taskService.getTasks().then((tasks: Task[]) => this.tasks = tasks);
   }
   
   newTask(tsktp){
	   	   
		this.addTask=false;
		this.tsktype=tsktp;
		this.pri="high";
		this.ddate=new Date().toLocaleDateString();
		alert("Add new task to '"+tsknm+"' Category.");
   }
   
   hideForm(){
	   if(confirm("Do you want to close form?"))
	   {
			this.addTask=true;
	   }
   }
   
   removeTask(cardtype,cardtask_name){
	   
	   if (confirm('Do you want to remove this task?')) 
		{
			var index=0;
			if(cardtype=="New")
				index=0;
			else if(cardtype=="On-Hold")
				index=1;
			else if(cardtype=="In-Progress")
				index=2;
			else if(cardtype=="Done")
				index=3;
			
			for(var val in this.tasks[index].cards)
			{
				var card_obj=this.tasks[index].cards[val];
				if(cardtask_name==card_obj.task_name)
				{
					this.tasks[index].cards.splice(val,1);
				}
			}
			
		}
   }
   
   sortTask(tsktp){
	   
	    var index=0;
	    if(tsktp=="New")
			index=0;
		else if(tsktp=="On-Hold")
			index=1;
		else if(tsktp=="In-Progress")
			index=2;
		else if(tsktp=="Done")
			index=3;
	   
	   if(this.sortval=="1")  //by priority
	   {  			
			this.tasks[index].cards.sort(function(a, b){
				
				var apri=a.priority;
				var bpri=b.priority;				
				
				if(apri=="high" && (bpri=="medium" || bpri=="low"))
					return true;
				else if(bpri=="high" && (apri=="medium" || apri=="low"))
					return false;	
				else if(bpri=="low" && apri=="medium")
					return true;
				else
					return false;
			});
			
			alert("Sort Priority of '"+tsktp+"' Category by Ascending Order..!!");
	   }
	   else if(this.sortval=="2")  //by date
	   {
		   this.tasks[index].cards.sort(function(a, b){
				
				var adarr=a.due_date.split('/');
				var bdarr=b.due_date.split('/');
				
				var add=adarr[0]; var amm=adarr[1]; var ayy=adarr[2]; 
				var bdd=bdarr[0]; var bmm=bdarr[1]; var byy=bdarr[2]; 
				
				if(+ayy>+byy)
					return true;
				else if(+amm>+bmm)
					return true;
				else if(+add>+bdd)
					return true;
				else
					return false;
			});
			
			alert("Sort Due Date of '"+tsktp+"' Category by Ascending Order..!!");
	   }
	   
   }
   
   onSubmit(){
	   	   		
		if(this.tsktype=='New')
		{
			this.tasks[0].cards.push({"task_name":this.tname, "due_date":this.ddate, "priority": this.pri});   
			
			alert("New Task added to 'New' Category Successfully.");
		}
		else if(this.tsktype=='On-Hold')
		{
			this.tasks[1].cards.push({"task_name":this.tname, "due_date":this.ddate, "priority": this.pri});   

			alert("New Task added to 'On-Hold' Category Successfully.");
		}
		else if(this.tsktype=='In-Progress')
		{
			this.tasks[2].cards.push({"task_name":this.tname, "due_date":this.ddate, "priority": this.pri});   

			alert("New Task added to 'In-Progress' Category Successfully.");			
		}
		else if(this.tsktype=='Done')
		{
			this.tasks[3].cards.push({"task_name":this.tname, "due_date":this.ddate, "priority": this.pri});   

			alert("New Task added to 'Done' Category Successfully.");			
		}
		
		this.tname="";
		this.ddate="";
		this.pri="";
		this.addTask=true;

   }

	ngOnInit():any{
		this.getTasks();
	}
}