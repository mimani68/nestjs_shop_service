## NestJS Shop Project

This project is a NestJS-based e-commerce application. It demonstrates how to build a simple e-commerce store using NestJS, a popular Node.js framework for building scalable web applications. The project includes a product module, a cart module, and a database to store the data.

### Prerequisites

Before starting, ensure that you have Node.js and NestJS installed. You can install NestJS globally using the following command:

```bash
npm install -g @nestjs/cli
```

### Setup

1. Clone the project from the GitHub repository[1].
2. Install the required dependencies by running:

```bash
npm install
```

### Running the Project

To run the project, use the following commands:

```bash
nest start
```
or
```bash
npm run start
```

This will start the backend server on port 3000. You can access the API documentation at `localhost:3000/docs`.

### Testing

To run tests for the project, use the following command:

```bash
npm run test
```

This will run the tests defined in the `src/test/**/*.ts` files.

#### Custom test running

```bash
npm run test -- test/unit/*.spec.ts
```

### Deployment

#### A) General

To deploy the project, you can use a service like Heroku. Follow the instructions in the [LogRocket Blog tutorial][1] to deploy the NestJS e-commerce app on Heroku.

For more information on using NestJS, refer to the [official NestJS documentation][3].

Citations:
[1] https://blog.logrocket.com/how-build-ecommerce-app-nestjs/
[2] https://blog.logrocket.com/build-project-using-angular-nestjs/
[3] https://www.reddit.com/r/node/comments/zxzzzj/does_anyone_know_any_samples_of_projects_related/?rdt=45045
[4] https://youtube.com/watch?v=GHTA143_b-s


#### B) Dockerized

```bash
docker build -t app:v1.0.0 .
docker run --name shop -p 3000:3000 app:v1.0.0
```
