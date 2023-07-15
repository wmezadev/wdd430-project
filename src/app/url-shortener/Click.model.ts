export class Click {
  constructor(
    public _id: string,
    public browser: string,
    public version: string,
    public os: string,
    public platform: string,
    public url: string,
    public createdAt: string,
    public updatedAt: string,
  ) {}
}
