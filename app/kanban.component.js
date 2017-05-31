System.register(["angular2/core", "./task.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, task_service_1;
    var KanbanComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (task_service_1_1) {
                task_service_1 = task_service_1_1;
            }],
        execute: function() {
            KanbanComponent = (function () {
                function KanbanComponent(_taskService) {
                    this._taskService = _taskService;
                    this.addTask = true;
                    this.tsktype = "";
                    this.note = "*To sort task of perticular category by Due Date and by Priority, Select element must change value. By default, Tasks are no sorted.";
                    this.pri = "high";
                    this.ddate = new Date().toLocaleDateString();
                    this.sortval = 1;
                }
                KanbanComponent.prototype.getTasks = function () {
                    var _this = this;
                    this._taskService.getTasks().then(function (tasks) { return _this.tasks = tasks; });
                };
                KanbanComponent.prototype.newTask = function (tsktp) {
                    this.addTask = false;
                    this.tsktype = tsktp;
                    this.pri = "high";
                    this.ddate = new Date().toLocaleDateString();
                    alert("Add new task to '" + tsknm + "' Category.");
                };
                KanbanComponent.prototype.hideForm = function () {
                    if (confirm("Do you want to close form?")) {
                        this.addTask = true;
                    }
                };
                KanbanComponent.prototype.removeTask = function (cardtype, cardtask_name) {
                    if (confirm('Do you want to remove this task?')) {
                        var index = 0;
                        if (cardtype == "New")
                            index = 0;
                        else if (cardtype == "On-Hold")
                            index = 1;
                        else if (cardtype == "In-Progress")
                            index = 2;
                        else if (cardtype == "Done")
                            index = 3;
                        for (var val in this.tasks[index].cards) {
                            var card_obj = this.tasks[index].cards[val];
                            if (cardtask_name == card_obj.task_name) {
                                this.tasks[index].cards.splice(val, 1);
                            }
                        }
                    }
                };
                KanbanComponent.prototype.sortTask = function (tsktp) {
                    var index = 0;
                    if (tsktp == "New")
                        index = 0;
                    else if (tsktp == "On-Hold")
                        index = 1;
                    else if (tsktp == "In-Progress")
                        index = 2;
                    else if (tsktp == "Done")
                        index = 3;
                    if (this.sortval == "1") {
                        this.tasks[index].cards.sort(function (a, b) {
                            var apri = a.priority;
                            var bpri = b.priority;
                            if (apri == "high" && (bpri == "medium" || bpri == "low"))
                                return true;
                            else if (bpri == "high" && (apri == "medium" || apri == "low"))
                                return false;
                            else if (bpri == "low" && apri == "medium")
                                return true;
                            else
                                return false;
                        });
                        alert("Sort Priority of '" + tsktp + "' Category by Ascending Order..!!");
                    }
                    else if (this.sortval == "2") {
                        this.tasks[index].cards.sort(function (a, b) {
                            var adarr = a.due_date.split('/');
                            var bdarr = b.due_date.split('/');
                            var add = adarr[0];
                            var amm = adarr[1];
                            var ayy = adarr[2];
                            var bdd = bdarr[0];
                            var bmm = bdarr[1];
                            var byy = bdarr[2];
                            if (+ayy > +byy)
                                return true;
                            else if (+amm > +bmm)
                                return true;
                            else if (+add > +bdd)
                                return true;
                            else
                                return false;
                        });
                        alert("Sort Due Date of '" + tsktp + "' Category by Ascending Order..!!");
                    }
                };
                KanbanComponent.prototype.onSubmit = function () {
                    if (this.tsktype == 'New') {
                        this.tasks[0].cards.push({ "task_name": this.tname, "due_date": this.ddate, "priority": this.pri });
                        alert("New Task added to 'New' Category Successfully.");
                    }
                    else if (this.tsktype == 'On-Hold') {
                        this.tasks[1].cards.push({ "task_name": this.tname, "due_date": this.ddate, "priority": this.pri });
                        alert("New Task added to 'On-Hold' Category Successfully.");
                    }
                    else if (this.tsktype == 'In-Progress') {
                        this.tasks[2].cards.push({ "task_name": this.tname, "due_date": this.ddate, "priority": this.pri });
                        alert("New Task added to 'In-Progress' Category Successfully.");
                    }
                    else if (this.tsktype == 'Done') {
                        this.tasks[3].cards.push({ "task_name": this.tname, "due_date": this.ddate, "priority": this.pri });
                        alert("New Task added to 'Done' Category Successfully.");
                    }
                    this.tname = "";
                    this.ddate = "";
                    this.pri = "";
                    this.addTask = true;
                };
                KanbanComponent.prototype.ngOnInit = function () {
                    this.getTasks();
                };
                KanbanComponent = __decorate([
                    core_1.Component({
                        selector: 'my-kanban',
                        template: "<div id=\"kanban_board\">\n\t<p>{{note}}</p>\n\t<ul class=\"ul-unstyle\">\n\t<li *ngFor=\"#tsk of tasks\">\n\t\n\t\t<h3 class=\"text-align:center;\"><a (click)='newTask(tsk.name)'><i class=\"glyphicon glyphicon-plus\"></i></a><span class=\"title\">{{ tsk.name}}</span><select [(ngModel)]=\"sortval\" (change)=\"sortTask(tsk.name)\" class=\"form-control\">\n\t\t\t<option value=\"1\">By Due-Date</option>\n\t\t\t<option value=\"2\">By Priority</option>\n\t\t</select></h3>\n\t\t<ul class=\"child_container_ul\"><li *ngFor=\"#cards of tsk.cards\">\n\t\t\t<div class=\"task_dblist\">\n\t\t\t\t<a (click)='removeTask(tsk.name,cards.task_name)'><i class=\"glyphicon glyphicon-remove\"></i></a>\n\t\t\t\t<strong>Task : <span class=\"task_nm\">{{cards.task_name}}</span></strong>\n\t\t\t\t<hr/>\n\t\t\t\t<span class=\"date_prio\"><strong>Due Date :</strong>{{cards.due_date}} , <strong>Priority :</strong> {{cards.priority | uppercase}}</span>\n\t\t\t</div>\n\t\t\t\n\t\t</li>\n\t\t\t\n\t\t</ul>\n\t\n\t</li></ul>\t\n\t\t\n\t\t<div id=\"myForm\" [hidden]=\"addTask\">\n\t\t\t<form (ngSubmit)=\"onSubmit()\" #taskForm=\"ngForm\" novalidate>\n\t\t\t\t<strong>Add Task to <span>'{{tsktype}}'</span> Category : <input placeholder=\"Enter Task Name\" #task_name=\"ngForm\" [(ngModel)]='tname' ngControl=\"task_name\" required class=\"form-control\" type=\"text\" /></strong>\n\t\t\t\t<span class=\"date_prio\">Due Date : <input #due_date=\"ngForm\" placeholder=\"Enter Due Date\" [(ngModel)]='ddate' ngControl=\"due_date\" required class=\"form-control\" type=\"date\" />\n\t\t\t\tPriority : <select [(ngModel)]='pri' ngControl=\"priority\" #priority=\"ngForm\" required class=\"form-control\">\n\t\t\t\t\t<option selected value=\"high\">High</option>\n\t\t\t\t\t<option value=\"medium\">Medium</option>\n\t\t\t\t\t<option value=\"low\">Low</option>\n\t\t\t\t</select></span>\n\t\t\t\t<p></p>\n\t\t\t\t<div class=\"text-center\"><button type=\"submit\" [disabled]=\"!taskForm.form.valid\" class=\"text-center btn btn-primary\">Add Task</button>&nbsp;&nbsp;<button (click)=\"hideForm()\" type=\"button\" class=\"text-center btn btn-danger\">Close</button></div>\n\t\t\t </form>\n\t\t</div>\n\t\n\t\n\t</div>",
                        providers: [task_service_1.TaskService]
                    }), 
                    __metadata('design:paramtypes', [task_service_1.TaskService])
                ], KanbanComponent);
                return KanbanComponent;
            }());
            exports_1("KanbanComponent", KanbanComponent);
        }
    }
});
//# sourceMappingURL=kanban.component.js.map