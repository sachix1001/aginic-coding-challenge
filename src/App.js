import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const jobs = [{ id: 1, state: "progress" },{ id: 1000, state: "progress" }];
  return (
    <div className="container">
      <div className="formContainer">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Job URL</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <br />
      <Form.Label>Job state</Form.Label>
      {jobs.map((job) => (
        <JobStatus id={job.id} state={job.status} color="black"></JobStatus>
      ))}
    </div>
  );
}

function JobStatus(props) {
  const { id, state, color, progress } = props;
  return (
    <ListGroup >
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
