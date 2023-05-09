import { Category } from "./category";
import { User } from './user';

export interface Ticket {
    id?: string;
    title: string;
    description: string;
    createdBy?: string;
    assignedTo?: User;
    assignmentDate?: Date;
    priority: string;
    category: Category;
    // comments: Comment[];
    // attachments: Attachment[];
    status?: string;
    createdAt?: string;
    updatedAt?: string;
  }
