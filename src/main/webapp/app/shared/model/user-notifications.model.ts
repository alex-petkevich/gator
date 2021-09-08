import { Moment } from 'moment';

export interface IUserNotifications {
  id?: number;
  contact?: string;
  userLogin?: string;
  userId?: number;
  isActive?: boolean;
  lastSent?: Moment;
  totalQty?: number;
  notificationName?: string;
  notificationId?: number;
  userSearchesName?: string;
  userSearchesId?: number;
}

export class UserNotifications implements IUserNotifications {
  constructor(
    public id?: number,
    public contact?: string,
    public userLogin?: string,
    public userId?: number,
    public isActive?: boolean,
    public lastSent?: Moment,
    public totalQty?: number,
    public notificationName?: string,
    public notificationId?: number,
    public userSearchesName?: string,
    public userSearchesId?: number
  ) {
    this.isActive = this.isActive || false;
  }
}
