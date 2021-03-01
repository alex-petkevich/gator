export interface IUserSearches {
  id?: number;
  name?: string;
  payload?: string;
  userId?: number;
}

export class UserSearches implements IUserSearches {
  constructor(public id?: number, public name?: string, public payload?: string, public userId?: number) {}
}
