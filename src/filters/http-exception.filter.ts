import {
  Injectable,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  Logger,
  Catch,
} from "@nestjs/common";
import { Request, Response } from "express";
import { IBadRequestError } from "src/types";

const APP_ENV = process.env.APP_ENV;

@Catch(HttpException)
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const { method, path } = host.switchToHttp().getRequest<Request>();
    const statusCode = exception.getStatus();
    let errorMessage = APP_ENV === "PROD" ? exception.message : exception.stack;

    if (statusCode === 400) {
      const errorMessagesArray = (exception.getResponse() as IBadRequestError)
        .message;

      errorMessage = errorMessagesArray.join("// ");
    }

    this.logger.error(`${method} - ${statusCode} - ${path}`);

    response
      .status(statusCode)
      .json({ success: false, message: errorMessage, statusCode });
  }
}
