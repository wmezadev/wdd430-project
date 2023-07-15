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

## Backend

This project was build using [Expressjs](https://expressjs.com/) version 4.18.1.

## Enviroment variables

Before starting, create a file `.env` at the root an add your own API url like this (You can use .env.example as reference):

```bash
NG_APP_API_URL=http://localhost:3000
PORT=3000
BASE_URL=http://localhost
MONGO_URI=mongodb://localhost/url-shortener
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build and Deployment

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Unfortunately for now it is necesary to **set the variable NG_APP_API_URL** with the value that you want to include for production, and **build the app before push to the repo**, for example `NG_APP_API_URL=https://wmezadev-url-shortener-9d83.onrender.com` to be able to deploy to [render.com](https://render.com/).

## Author

- William E Meza ([@wmezadev](https://github.com/wmezadev/))
