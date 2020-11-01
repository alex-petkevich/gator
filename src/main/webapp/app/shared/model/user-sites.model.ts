export interface IUserSites {
  id?: number;
  userLogin?: string;
  userId?: number;
}

export class UserSites implements IUserSites {
  constructor(public id?: number, public userLogin?: string, public userId?: number) {}
}
