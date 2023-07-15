import { Click } from './Click.model';

export class Url {
  constructor(
    public id: string,
    public originalUrl: string,
    public shortUrl: string,
    public clicksCounter: number,
    public clicks: Click[],
    public createdAt: string,
    public updatedAt: string,
  ) {}
}
