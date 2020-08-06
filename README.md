## API tester

 A web application to test whether an API is up or not.

 Input API URL(a job) you want to test. The job is completed by making a HTTP request to that URL, and the output of the job is the status code of the response.

 ### conditions
- Only one URL may be fetched at a time by a given job.
- If a job fails, it will re-try. After 3 consecutive failures, it returns a status code.

### components
1. Front End
 - Submit: submit a job to the database to process
 - Update: update all jobs and its state in the database
 - Clear: delete all jobs in the database
 - Auto update: all jobs are automatically updated every 10 seconds
 
2. API server
 - GET '/job/all': return an array of all jobs
 - GET '/clear': delete all rows in the database
 - GET '/error/: returns 404 *for testing purpose
 - POST '/job': insert job in the database
 
3. Data Persistence Layer
 - id: auto increment, primary
 - URL: string,notNullable
 - state: integer
 - attempt: integer,defaultTo(0);
 - completed: boolean, defaultTo(false);
 
4. Job Runner
 - access to the database
 - grab a list of jobs where 'completed' is false
 - send HTTP request to job's URL
 - check for jobs
  - on startup
  - on the completion of a previous job
  - once every 30 seconds if there are no jobs in the queue.
 - update each job if HTTP request is
  - successful or two previouse unsuccessfull attempts; status code, completed=true, attempt++
  - unsuccessful: attempt++


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
