import {TASKS} from "./task.list";


export class TaskService {
   getTasks() {
      return Promise.resolve(TASKS); // takes values from task.list typescript file
   }
}