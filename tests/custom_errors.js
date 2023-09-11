export class ExpressError extends Error {
  constructor(message, status) {
    super(); //super is needed to run constructor on 'Error'.
    this.message = message;
    this.status = status;
  }
}
