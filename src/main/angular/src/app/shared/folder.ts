import { User } from './user';

export class Folder {
    id: number;
    owner: User;
    name: string;
    p_folder: Folder;
}
