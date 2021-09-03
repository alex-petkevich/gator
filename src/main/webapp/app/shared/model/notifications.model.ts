export interface INotifications {
  id?: number;
  name?: string;
  title?: string;
  isActive?: boolean;
}

export class Notifications implements INotifications {
  constructor(public id?: number, public name?: string, public isActive?: boolean, title?: string) {
    this.isActive = this.isActive || false;
  }
}
