import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  Inject,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  @Inject()
  private logger = new Logger('ExceptionHandler');
  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let responseError = ctx.getResponse() as any;

    if (typeof exception.getResponse == 'function')
      responseError = exception.getResponse();
    ctx.getResponse();
    const { httpAdapter } = this.httpAdapterHost;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorType = responseError.error || 'Internal server error';
    const responseBody = {
      success: false,
      statusCode: status,
      error: errorType,
      message:
        status >= HttpStatus.INTERNAL_SERVER_ERROR
          ? 'Something Went Wrong.'
          : responseError.message,
      errors: responseError.errors || [],
    };

    this.logger.debug(exception.message);
    this.logger.error(responseBody);

    httpAdapter.reply(response, responseBody, status);
  }
}
