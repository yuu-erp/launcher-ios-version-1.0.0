import { ExceptionBase } from './exception.base'
import {
  ARGUMENT_INVALID,
  ARGUMENT_NOT_PROVIDED,
  ARGUMENT_OUT_OF_RANGE,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND
} from './exception.codes'

/**
 * Used to indicate that an argument was not provided (is empty object/array, null of undefined).
 *
 * @class ArgumentNotProvidedException
 * @extends {ExceptionBase}
 */
export class ArgumentNotProvidedException extends ExceptionBase {
  readonly code = ARGUMENT_NOT_PROVIDED

  constructor(message?: string, metadata?: Record<string, unknown>, cause?: Error) {
    super(message ?? NotFoundException.defaultMessage, cause, metadata)
  }
}

/**
 * Used to indicate that an incorrect argument was provided to a method/function/class constructor
 *
 * @class ArgumentInvalidException
 * @extends {ExceptionBase}
 */
export class ArgumentInvalidException extends ExceptionBase {
  readonly code = ARGUMENT_INVALID

  constructor(message?: string, metadata?: Record<string, unknown>, cause?: Error) {
    super(message ?? NotFoundException.defaultMessage, cause, metadata)
  }
}

/**
 * Used to indicate that an argument is out of allowed range
 * (for example: incorrect string/array length, number not in allowed min/max range etc)
 *
 * @class ArgumentOutOfRangeException
 * @extends {ExceptionBase}
 */
export class ArgumentOutOfRangeException extends ExceptionBase {
  readonly code = ARGUMENT_OUT_OF_RANGE

  constructor(message?: string, metadata?: Record<string, unknown>, cause?: Error) {
    super(message ?? NotFoundException.defaultMessage, cause, metadata)
  }
}

/**
 * Used to indicate conflicting entities (usually in the database)
 *
 * @class ConflictException
 * @extends {ExceptionBase}
 */
export class ConflictException extends ExceptionBase {
  readonly code = CONFLICT

  constructor(message?: string, metadata?: Record<string, unknown>, cause?: Error) {
    super(message ?? NotFoundException.defaultMessage, cause, metadata)
  }
}

/**
 * Used to indicate that entity is not found
 *
 * @class NotFoundException
 * @extends {ExceptionBase}
 */
export class NotFoundException extends ExceptionBase {
  static readonly defaultMessage = 'Not found'
  readonly code = NOT_FOUND

  constructor(message?: string, metadata?: Record<string, unknown>, cause?: Error) {
    super(message ?? NotFoundException.defaultMessage, cause, metadata)
  }
}

/**
 * Used to indicate an internal server error that does not fall under all other errors
 *
 * @class InternalServerErrorException
 * @extends {ExceptionBase}
 */
export class InternalServerErrorException extends ExceptionBase {
  message = 'Internal server error'

  readonly code = INTERNAL_SERVER_ERROR

  constructor(message?: string, metadata?: Record<string, unknown>, cause?: Error) {
    super(message ?? NotFoundException.defaultMessage, cause, metadata)
  }
}
