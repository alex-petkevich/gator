export interface IProperties {
  id?: number;
  name?: string;
  isActive?: boolean;
}

export class Properties implements IProperties {
  constructor(public id?: number, public name?: string, public isActive?: boolean) {
    this.isActive = this.isActive || false;
  }
}
