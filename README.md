# cast-and-crew
A module for displaying the works of a selected cast/crew member.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setup](#setup)
3. [Usage] (#usage)


## Prerequisites
1. Installation of MongoDB listening on port 27017
2. Node v10.16.0

## Setup
1. Install dependencies via `npm install`.
2. Run `npm run react-dev` to begin transpilation via `Babel`.
3. Run `npm run server-dev` to start the server on port 3000.
4. Run `npm test` to ensure the environment and service are compatible.
5. Run `npm run seed` to populate the database with sample data.

## Usage
To retrieve a movie, use a query string:
`http://localhost:3000/?id=1`
