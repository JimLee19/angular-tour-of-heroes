
export class BusinessError extends Error {
    code: string;
    constructor(code: string, message: string) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, BusinessError.prototype);
    }
}
