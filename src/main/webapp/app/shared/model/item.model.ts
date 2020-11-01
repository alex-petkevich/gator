import { Moment } from 'moment';

export interface IItem {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  link?: string;
  ownerName?: string;
  ownerLink?: string;
  image?: string;
  active?: boolean;
  createdAt?: Moment;
  updatedAt?: Moment;
  deletedAt?: Moment;
  categoryName?: string;
  categoryId?: number;
}

export class Item implements IItem {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public price?: number,
    public link?: string,
    public ownerName?: string,
    public ownerLink?: string,
    public image?: string,
    public active?: boolean,
    public createdAt?: Moment,
    public updatedAt?: Moment,
    public deletedAt?: Moment,
    public categoryName?: string,
    public categoryId?: number
  ) {
    this.active = this.active || false;
  }
}
