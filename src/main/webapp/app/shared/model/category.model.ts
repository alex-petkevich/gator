export interface ICategory {
  id?: number;
  name?: string;
  link?: string;
  active?: boolean;
  siteTitle?: string;
  siteId?: number;
}

export class Category implements ICategory {
  constructor(
    public id?: number,
    public name?: string,
    public link?: string,
    public active?: boolean,
    public siteTitle?: string,
    public siteId?: number
  ) {
    this.active = this.active || false;
  }
}
