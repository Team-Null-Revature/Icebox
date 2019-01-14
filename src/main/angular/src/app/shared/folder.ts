import { User } from './user';

export class Folder{
    folder_id: number;
    owner: User;
    name: string;
    p_folder: Folder;
}