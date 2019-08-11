export class CatCreateRq {
    constructor(
        readonly name: string,
        readonly age: number,
        readonly breed: string,
    ) {}
}
