import { Folder } from 'src/app/shared/folder';
import { Tag } from './tag';

export class File {
    id: number;
    filename: string;
    filetype: string;
    added: Date = new Date();
    filesize: number;
    sharestr: string;
    p_folder: Folder;
    tags: Tag[];
}
