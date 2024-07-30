export class AppError extends Error {
  code: string;
  number: number;
  message: string;

  constructor(code: string, number?: number, message?: string) {
    super(message);

    this.code = code;
    this.number = number || -1;
    this.message = message || "Error: An error occurred.";
  }
}
