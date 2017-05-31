System.register(["./task.list"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var task_list_1;
    var TaskService;
    return {
        setters:[
            function (task_list_1_1) {
                task_list_1 = task_list_1_1;
            }],
        execute: function() {
            TaskService = (function () {
                function TaskService() {
                }
                TaskService.prototype.getTasks = function () {
                    return Promise.resolve(task_list_1.TASKS); // takes values from task.list typescript file
                };
                return TaskService;
            }());
            exports_1("TaskService", TaskService);
        }
    }
});
//# sourceMappingURL=task.service.js.map