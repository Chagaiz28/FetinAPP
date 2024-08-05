## Fetin APP API

Stacks: TypeScript, NestJs, MongoDB.

### Configuration

- Set up the prod.env and dev.env file on a env folder based on the .env.example file.

## Installation

```
$ npm install
```

## Running the app

```
$ npm run start
```

# development mode

```
$ npm run start:dev
```

# production mode

```
$ npm run start:prod

```

## Tests

# unit tests

```
$ npm run test
```

# e2e tests

```
$ npm run test:e2e
```

### Architecture

- Common
  - src/common/: resources that are used by all application
- Config
  - src/config: env variables config
- Providers
  - src/providers: database connection and external applications
- Resources
  src/resources: create the new resource (Use campaigns as example)
  - DTO:
    - DTOs for creation need validation and documentation
    - DTOs for update extends the creation DTO
    - DTOs for response extends the base DTO and need documentation and static method to create the DTO from the model
  - Tests
    - Use the mocks and inspiration from other resources
  - Service
    - Create the service to handle the business logic
  - Controller
    - Validate permissions
    - Validate DTOs
    - Document the endpoints
    - Call the service
    - Return the response using the DTOs
  - Module
    - Create the module to export the controller and import other modules
- app.module: import the new module
