export interface ISite {
  id?: number;
  title?: string;
  url?: string;
  active?: boolean;
  userLogin?: string;
  userId?: number;
}

export class Site implements ISite {
  constructor(
    public id?: number,
    public title?: string,
    public url?: string,
    public active?: boolean,
    public userLogin?: string,
    public userId?: number
  ) {
    this.active = this.active || false;
  }
}
