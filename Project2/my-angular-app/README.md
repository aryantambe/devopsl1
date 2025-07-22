# MyAngularApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.



# 🚀 Project 2: Deploy Angular Application in Docker

This project demonstrates how to build and deploy an Angular application using Docker.

---

## Technologies Used
- Angular CLI
- Node.js
- Docker
- Nginx

---

## Project Structure
Project2/
└── my-angular-app/
├── Dockerfile
├── package.json
├── angular.json
├── dist/
└── ...other Angular files


---

## Step-by-Step Commands Used

### 1. Install Angular CLI (globally)
``bash
npm install -g @angular/cli

### 2. Create Angular Application
ng new my-angular-app

Choose CSS when prompted.
Skip zoneless and SSR options.


### 3. Build the Angular App
cd my-angular-app
ng build


### 4. Create Dockerfile
Paste the following in Dockerfile:
# Stage 1: Build Angular App
FROM node:22 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve app with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/my-angular-app/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


### 5. Build Docker Image
docker build -t angular-app .

### 6. Run Docker Container
docker run -d -p 8080:80 --name angular-container angular-app

View the App: http://localhost:8080


Clean Up (if needed):-
docker stop angular-container
docker rm angular-container




Docker Compose (docker-compose.yml:)
services:
  angular-app:
    build: .
    container_name: angular-container
    ports:
      - "8080:80"

to run:- docker-compose up --build

