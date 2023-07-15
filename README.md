# WDD 430 Course Project - URL Shortener

This is a personal project work for the BYU-Idaho Web Full-Stack Development (WDD 430).

## Criteria

This will be a Single Page Application (SPA) of your choice that uses the MEAN (MongoDB, Express, Angular, and NodeJS) stack.

The application needs to include the following:

- Angular component(s)
- Angular service(s)
- Node web service(s)
- MongoDB database
- It should support the CRUD (Create, Read, Update, and Delete) methods of the application data.

## Getting started

This is a URL Shortener app that saves URLs in a database collection and generate new URLs in a shorter version and redirects to the originals URLs.

## Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

### Frontend Enviroment variables

Before starting, create a file `.env` at the root an add your own API url like this (You can use .env.example):

```bash
NG_APP_API_URL=http://localhost:3000
```

## Backend

This project was build using [Expressjs](https://expressjs.com/) version 4.18.1.

### Backend Enviroment variables

Before starting, create a file `config/.env` at the config folder an add your own settings for your database like this (You can use `config/.env.example`):

```bash
PORT=3000
BASE_URL=http://localhost
MONGO_URI=mongodb://localhost/url-shortener
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Author

- William E Meza ([@wmezadev](https://github.com/wmezadev/))
