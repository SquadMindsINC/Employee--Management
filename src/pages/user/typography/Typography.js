import React from "react";
import {
  Col,
  Row,
} from "reactstrap";


const Text = () => {
  console.log("--- typography");
  return (
    <div>
      <Row>
        <Col className="mb-4" xs={12}>
         <p> test........</p>
        </Col>
      </Row>
    </div>
  )
}

export default Text;
