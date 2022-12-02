export class Token {

    Tag: number

    constructor(tag: number) {
        this.Tag = tag;
    }

    ToString() {
        return `${this.Tag}`
    }
}