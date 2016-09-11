# Massdrop Coding Challenge

>Create a job queue whose workers fetch data from a URL and store the results in a database.  The job queue should expose a >REST API for adding jobs and checking their status / results.

>Example:

>User submits www.google.com to your endpoint.  The user gets back a job id. Your system fetches www.google.com (the result of which would be HTML) and stores the result.  The user asks for the status of the job id and if the job is complete, he gets a response that includes the HTML for www.google.com

## Dependencies
- [Redis](https://www.npmjs.com/package/redis) for quick db access
- [Bull](https://github.com/OptimalBits/bull) for persistence job queue management
- [Express](https://www.npmjs.com/package/express) for route endpoint handling
- [Request](https://www.npmjs.com/package/request) for simple HTTP requests

## Running the app
Start redis (defaults to 127.0.0.1:6379)
```
redis-server
```

Start the app (defaults to :3000)
```
node app.js
```

## API Endpoints
### Check on job status and result (GET /job/:job_id)
Example GET request
```
curl http://localhost:3000/job/c4ca4238a0b923820dcc509a6f75849b
```

Example GET response
```
{
  "job_id": "c4ca4238a0b923820dcc509a6f75849b",
  "status": "completed",
  "html": "foobar"
}
```
Job id is hashed to prevent attackers from viewing other jobs. Having a better hash or authentication would be good to have to make it difficult for attackers to gain access to other jobs.

Status can be `completed`, `in queue`, or `not created` depending on state of the job.

### Submit a url to the job queue to be fetched (POST /job)
Example POST request
```
curl -H "Content-Type: application/json" \
    -X POST -d '{ "url": "http://www.google.com" }' \
    http://localhost:3000/job
```
Example POST response
```
{
  "job_id":"c4ca4238a0b923820dcc509a6f75849b"
}
```
