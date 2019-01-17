import { Folder } from 'src/app/shared/folder';
import { Tag } from './tag';

export class File {
    id: Number;
    name: String;
    type: String;
    created: Date;
    size: Number;
    share: String;
    folder: Folder;
    tags: Tag[];
}
