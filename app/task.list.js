System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TASKS;
    return {
        setters:[],
        execute: function() {
            exports_1("TASKS", TASKS = [
                { "name": "New", "cards": [
                        { "task_name": "Kanban Board development", "due_date": "18/5/2017", "priority": "high" },
                        { "task_name": "Design of Kanban Board", "due_date": "19/5/2017", "priority": "low" }
                    ] },
                { "name": "On-Hold", "cards": [
                        { "task_name": "Kanban Backend Work", "due_date": "20/5/2017", "priority": "low" },
                        { "task_name": "Kanban Backend Designing", "due_date": "19/5/2017", "priority": "high" }
                    ] },
                { "name": "In-Progress", "cards": [
                        { "task_name": "Testing of Kanban Borad", "due_date": "18/5/2017", "priority": "high" }
                    ] },
                { "name": "Done", "cards": [
                        { "task_name": "Work-Flow Understanding", "due_date": "18/5/2017", "priority": "medium" },
                        { "task_name": "Testing of First Module", "due_date": "19/5/2017", "priority": "high" }
                    ] }
            ]);
        }
    }
});
//# sourceMappingURL=task.list.js.map