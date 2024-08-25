import mongoose,{Document,Schema} from "mongoose";

export interface ITask extends Document{
    title: string;
    description: string;
    status: 'new'|'printed'|'reminder'|'completed';
    dueDate: Date;
    priority: 'low'|'medium'|'high';
    completedAt: Date|null;
    completed: boolean;
    category: string;
}

const taskSchema = new Schema({
    title: {type:String,required:true},
    description: {type:String},
    status: {type:String,required:true,default:'new'},
    dueDate: {type:Date,required:true},
    priority: {type:String,required:true},
    completedAt: {type:Date},
    completed: {type:Boolean,required:true,default:false},
    category: {type:String,required:true}
},{timestamps:true});

export const Task = mongoose.model<ITask>('Task',taskSchema);