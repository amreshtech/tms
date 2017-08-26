import { User } from './users.model';

export class Task {
    taskid: string;
    name: string;
    createdDate: Date;
    deadline: Date;
    description: string;
    status: string;
    assignedBy: User;
    assignedTo: User;
    done: boolean;
}
