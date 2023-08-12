Create an effective English vocabulary learning app called EVOCAB

## Tools

-   **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
-   **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
-   **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
-   **Error handling**: centralized error handling mechanism
-   **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
-   **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
-   **Dependency management**: with [Yarn](https://yarnpkg.com)
-   **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
-   **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
-   **Linting**: [Prettier](https://prettier.io)
-   **Editor config**: consistent editor configuration using [EditorConfig](https://editorconfig.org)

```

## Project Structure

```

src\
 |--config\ # Environment variables and configuration related things
|--controllers\ # Route controllers (controller layer)
|--docs\ # Swagger files
|--middlewares\ # Custom express middlewares
|--models\ # Mongoose models (data layer)
|--routes\ # Routes
|--services\ # Business logic (service layer)
|--utils\ # Utility classes and functions
|--validations\ # Request data validation schemas
|--app.js # Express app
|--index.js # App entry point

```

```
