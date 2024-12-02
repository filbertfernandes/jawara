export class RequestError extends Error {
  constructor(statusCode, message, errors) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = "RequestError";
  }
}

export class ValidationError extends RequestError {
  constructor(fieldErrors) {
    const message = ValidationError.formatFieldErrors(fieldErrors);
    super(400, message, fieldErrors);
    this.name = "ValidationError";
    this.errors = fieldErrors;
  }

  static formatFieldErrors(errors) {
    const formattedMessages = Object.entries(errors).map(
      ([field, messages]) => {
        const fieldName = field.charAt(0).toUpperCase() + field.slice(1);

        if (messages[0] === "Required") {
          return `${fieldName} is required`;
        } else {
          return messages.join(" and ");
        }
      }
    );

    return formattedMessages.join(", ");
  }
}

export class NotFoundError extends RequestError {
  constructor(resource) {
    super(404, `${resource} not found`);
    this.name = "NotFoundError";
  }
}

export class ForbiddenError extends RequestError {
  constructor(message = "Forbidden") {
    super(403, message);
    this.name = "ForbiddenError";
  }
}

export class UnauthorizedError extends RequestError {
  constructor(message = "Unauthorized") {
    super(401, message);
    this.name = "UnauthorizedError";
  }
}
