# Logging & Debugging

## HTTP Request Logging

FoalTS uses [morgan](https://www.npmjs.com/package/morgan) to log the HTTP requests. You can specify the output format using the environment variable `SETTINGS_LOGGER_FORMAT` or the `config/default.json` file:

```json
{
  ...
  "settings": {
    "loggerFormat": "tiny"
  }
}
```

## Logging Hook

FoalTS provides a convenient hook for logging debug messages: `Log(message: string, options: LogOptions = {})`.

```typescript
interface LogOptions {
  body?: boolean;
  params?: boolean;
  headers?: string[]|boolean;
  query?: boolean;
}
```

*Example:*
```typescript
import { Get, HttpResponseOK, Log } from '@foal/core';

@Log('AppController', {
  body: true,
  headers: [ 'X-CSRF-Token' ],
  params: true,
  query: true
})
export class AppController {
  @Get()
  index() {
    return new HttpResponseOK();
  }
}
```

## Advanced Logging

If you need advanced logging, you might be interested in using [winston](https://www.npmjs.com/package/winston), a popular logger in the Node.js ecosystem.

Here's an example on how to use it with Foal:

*LoggerService*
```typescript
import * as winston from 'winston';

export class LoggerService {
  private logger;

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: 'logs.txt'
        })
      ]
    });
  }

  info(msg) {
    this.logger.info(msg);
  }

  warn(msg) {
    this.logger.warn(msg);
  }

  error(msg) {
    this.logger.error(msg);
  }

}

```

*LogUserId hook*
```typescript
import { Hook } from '@foal/core';
// LoggerService import.

export function LogUserId() {
  return Hook((ctx, services) => {
    const logger = services.get(LoggerService);
    logger.info(`UserId is: ${ctx.user.id}`);
  });
}

```

*ProductController*
```typescript
import { Get } from '@foal/core';
// LogUserId import.

export class ProductController {

  @Get('/')
  @LogUserId()
  readProducts() {
    ...
  }

}

```

*AuthController*
```typescript
import { dependency, Post } from '@foal/core';
// LoggerService import.

export class AuthController {
  @dependency
  logger: LoggerService;

  @Post('/signup')
  signup() {
    ...
    this.logger.info('Someone signed up!');
  }

}

```