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
              id="url"
              placeholder="Enter URL"
              onChange={(e) => {
                checkValidityAndSetUrl(e);
              }}
            />
          </Form.Group>
          <Button
            className="btn"
            variant="primary"
            type="submit"
            onClick={onClick}
          >
            Submit
          </Button>
          <Button
            className="btn"
            variant="primary"
            type="submit"
            onClick={fetchAllJobs}
          >
            Update
          </Button>
        </Form>
      </div>
      <br />
      <Form.Label>Job States</Form.Label>
      {jobs.map((job, i) => (
        <JobState
          id={job.URL}
          state={job.state}
          completed={job.completed}
          key={i}
        ></JobState>
      ))}
    </div>
  );
}

function JobState(props) {
  const { id, completed } = props;
  let { state } = props;
  state = completed ? state : "Processing...";
  return (
    <ListGroup className="job-container">
      <ListGroup.Item>
        <span className="hk-label">Job URL:</span> {id}
      </ListGroup.Item>
      <ListGroup.Item>
        <span className="hk-label">State:</span> {state}
      </ListGroup.Item>
    </ListGroup>
  );
}

export default App;
