import { User } from './users.model';

export class Task {
    // taskid: string;
    name: string;
    createdDate: string;
    deadline: string;
    description: string;
    status: string;
    assignedBy: string;
    assignedByName: string;
    assignedToName: string;
    assignedTo: string;
    done: boolean;
}
