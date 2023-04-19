import type { User } from "./User.model";
import DefaultUsers from "./DefaultUsers.json"


export class UserList {
  userList: User[];

  constructor(userList: User[] = []) {
    this.userList = [...userList, ...DefaultUsers];
  }
}

