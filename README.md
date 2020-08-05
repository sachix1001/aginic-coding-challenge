## API tester

 A web application to test whether an API is up or not.

 Input API URL(a job) you want to test. The job is completed by making a HTTP request to that URL, and the output of the job is the status code of the response.

 ### conditions
- Only one URL may be fetched at a time by a given job.
- If a job fails, it will re-try. After 3 consecutive failures, it returns a status code.

## Technology
- React
- NodeJS
- Postgres
- Bootstrap

## Accessing Oscar

#### deployed:   

This is deployed on Heroku
It can be accessed from here ↓
https://gentle-atoll-85006.herokuapp.com/

#### Local: Installation and Setup Instructions 


Clone down this repository. You will need `node`, `npm` and `Postgres` installed globally on your machine.  

Installation:

`npm install`
`psql`
`CREATE DATABASE job`  

To test server:  

`npm serverTest`  

To test worker:

`npm worker Test`

To Start Server:

`npm start`  

To Visit App:

`localhost:5000`  

# Credits

This app would not be possible without these free & open-source projects:

* React
* Postgres
* Bootstrap