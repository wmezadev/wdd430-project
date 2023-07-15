export class Url {
  constructor(
    public id: string,
    public originalUrl: string,
    public shortUrl: string,
    public clicksCounter: number,
    public createdAt: string,
    public updatedAt: string,
  ) {}
}
