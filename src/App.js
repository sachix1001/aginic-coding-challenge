import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [jobs, setJobs] = useState([]);
  const [URL, setURL] = useState([]);
  useEffect(() => {
    axios.get("job/all").then((res) => {
      setJobs(res.data);
    });
  }, []);

  function onClick() {
    axios.post("job", { URL });
    console.log("onClick -> URL", URL)
  }

  return (
    <div className="container">
      <div className="formContainer">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Job URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter URL"
              onChange={(e) => {
                console.log("App -> e.target.value", URL);
                setURL(e.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={onClick}>
            Submit
          </Button>
        </Form>
      </div>
      <br />
      <Form.Label>Job state</Form.Label>
      {jobs.map((job, i) => (
        <JobState id={job.URL} state={job.complete} key={i}></JobState>
      ))}
    </div>
  );
}

function JobState(props) {
  const { id, state } = props;
  return (
    <ListGroup>
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
