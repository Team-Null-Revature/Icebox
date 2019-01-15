import { File } from 'src/app/files/shared/file';
import { User } from 'src/app/shared/user';

export class Comment {
    id: number;
     user: User;
    file: File;
    comment: string;
}
