import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [jobs, setJobs] = useState([]);
  const [URL, setURL] = useState("");
  useEffect(() => {
    fetchAllJobs();
    const autoUpdate = () => {
      setInterval(fetchAllJobs, 5000);
    };
    autoUpdate();
    return () => clearInterval(autoUpdate);
  }, []);

  function onClick() {
    if (typeof URL !== "string" || URL.length === 0) return;
    axios.post("job", { URL });
    setURL("");
  }

  function fetchAllJobs() {
    axios.get("job/all").then((res) => {
      setJobs(res.data);
    });
  }
  function clearJobs() {
    axios.get("/clear");
    setJobs([]);
  }
  function checkValidityAndSetUrl(e) {
    if (e.target.checkValidity() && e.target.value.length !== 0)
      setURL(e.target.value);
  }

  return (
    <div className="container">
      <div className="formContainer">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Job URL</Form.Label>
            <Form.Control
              type="url"
              data-testid="url"
              value={URL}
              placeholder="Enter URL"
              onChange={(e) => {
                checkValidityAndSetUrl(e);
              }}
            />
          </Form.Group>
          <Button
            id="submit"
            className="btn"
            variant="primary"
            type="submit"
            data-testid="submit"
            onClick={onClick}
          >
            Submit
          </Button>
          <Button
            className="btn"
            variant="primary"
            type="submit"
            data-testid="update"
            onClick={fetchAllJobs}
          >
            Update
          </Button>
          <Button
            className="btn"
            variant="primary"
            type="submit"
            data-testid="clear"
            onClick={clearJobs}
          >
            Clear
          </Button>
        </Form>
      </div>
      <br />
      {jobs.length > 0 && <Form.Label>Job States</Form.Label>}
      {jobs.map((job, i) => (
        <JobState job={job} key={i}></JobState>
      ))}
    </div>
  );
}

function JobState(props) {
  const { job } = props;
  const state = job.completed ? job.state : `Processing...`;
  return (
    <ListGroup className="job-container">
      <ListGroup.Item>
        <span className="hk-label">Job URL:</span> {job.URL}
      </ListGroup.Item>
      <ListGroup.Item>
        <span className="hk-label">State:</span> {state}
        <span className="hk-label"> Attempt:</span> {job.attempt}
      </ListGroup.Item>
    </ListGroup>
  );
}

export default App;
