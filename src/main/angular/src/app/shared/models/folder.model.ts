import { User } from './user.model';

export class Folder {
  id: number;
  owner: User;
  name: string;
  p_folder: Folder;
}
