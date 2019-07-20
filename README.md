# cast-and-crew
A module for displaying the works of a selected cast/crew member.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setup](#setup)
3. [Usage](#usage)


## Prerequisites
1. Docker Desktop

## Setup
1. Clone this repo to your local machine.
2. In the root directory of this project, run `docker-compose up --build`.

Note: Run `docker image rm castandcrew:latest` before re-building to remove any duplicate images.

### Seeding the database
  1. `docker exec -it castandcrew /bin/bash`
  2. `npm run seed`

## Usage
To retrieve a movie, use a query string:
`http://localhost:3000/?id=1`


