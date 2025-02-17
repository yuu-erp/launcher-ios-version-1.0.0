export interface NormalizedException {
  message: string
  code: string
  correlationId: string
  stack?: string
  cause?: string
  /**
   * ^ Consider adding optional `metadata` object to
   * exceptions (if language doesn't support anything
   * similar by default) and pass some useful technical
   * information about the exception when throwing.
   * This will make debugging easier.
   */
  metadata?: Record<string, unknown>
}

export abstract class ExceptionBase extends Error {
  abstract code: string
  readonly correlationId: string
  readonly cause?: Error

  constructor(
    readonly message: string,
    cause?: Error,
    readonly metadata?: Record<string, unknown>
  ) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.correlationId = '1' // Giả lập requestId
    this.cause = cause
  }

  toJSON(): NormalizedException {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
      correlationId: this.correlationId,
      cause: this.cause ? this.cause.message : undefined,
      metadata: this.metadata
    }
  }
}
