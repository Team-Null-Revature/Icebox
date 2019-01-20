import { File } from './file.model';
import { User } from './user.model';

export class Comment {
  id: number;
  sender: User;
  file: File;
  comment: string;
}
