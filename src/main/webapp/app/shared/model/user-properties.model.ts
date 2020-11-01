export interface IUserProperties {
  id?: number;
  value?: string;
  userLogin?: string;
  userId?: number;
}

export class UserProperties implements IUserProperties {
  constructor(public id?: number, public value?: string, public userLogin?: string, public userId?: number) {}
}
