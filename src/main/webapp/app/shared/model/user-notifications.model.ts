import { Moment } from 'moment';

export interface IUserNotifications {
  id?: number;
  value?: string;
  userLogin?: string;
  userId?: number;
  isActive?: boolean;
  last_sent?: Moment;
  total_qty?: number;
  notificationId?: number;
  userSearchesId?: number;
}

export class UserNotifications implements IUserNotifications {
  constructor(
    public id?: number,
    public value?: string,
    public userLogin?: string,
    public userId?: number,
    public isActive?: boolean,
    public last_sent?: Moment,
    public total_qty?: number,
    public notificationId?: number,
    public userSearchesId?: number
  ) {
    this.isActive = this.isActive || false;
  }
}
