export class Token {

    Tag: number | string

    constructor(tag: number | string) {
        this.Tag = tag;
    }

    ToString() {
        return `${this.Tag}`
    }
}