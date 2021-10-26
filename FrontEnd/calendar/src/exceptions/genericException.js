const errorMessages = {};

export default class Exception extends Error {
    message;
    status;

    constructor(message, status = 500) {
        super();
        this.message = errorMessages[status] || message;
        this.status = status;
        this.action = {};
    }
}
