import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class EmptyArrayFilter implements ExceptionFilter {
  catch(result: any, host: ArgumentsHost) {
    if (Array.isArray(result) && result.length === 0) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      response.status(400).json({
        statusCode: 400,
        message: 'Ответ пуст',
      });
    } else {
      throw result;
    }
  }
}
