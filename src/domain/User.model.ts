import type { IUserData } from "./IUserData.model";

export class User implements IUserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;

  constructor(user: Partial<IUserData> = {}) {
    this.id = user.id ?? 0;
    this.firstName = user.firstName ?? '';
    this.lastName = user.lastName ?? '';
    this.email = user.email ?? '';
  }
}