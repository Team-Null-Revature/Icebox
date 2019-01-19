import { Folder } from './folder.model';
import { Tag } from './tag.model';

export class File {
  id: Number;
  tags: Tag[];
  name: String;
  type: String;
  size: Number;
  share: String;
  created: Date;
  folder: Folder;
}
