import {Task, ITask} from "../models/task";

export class TaskService{
    async createTask(task:ITask){
        return await Task.create(task);
    }

    async getTasks(){
        return await Task.find();
    }

    async getTask(id:string){
        return await Task.findById(id);
    }

    async updateTask(id:string,task:ITask){
        return await Task.findByIdAndUpdate(id,task,{new:true});
    }

    async deleteTask(id:string){
        return await Task.findByIdAndDelete(id);
    }
}