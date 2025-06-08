// Number.js
import React from "react";
import { Container, Row, Col } from "reactstrap";

const Number = ({ totalPrestataires = 0, totalSpecialites = 0 }) => {
  return (
    <div className="section text-center">
      <Container>
        <h2 className="title">Quelques chiffres clés</h2>
        <Row className="justify-content-center">
          <Col md="4">
            <div className="stat-box">
              <h1 className="display-3 font-weight-bold text-primary">
                {totalPrestataires}
              </h1>
              <p className="lead">Prestataires inscrits</p>
            </div>
          </Col>
          <Col md="4">
            <div className="stat-box">
              <h1 className="display-3 font-weight-bold text-success">
                {totalSpecialites}
              </h1>
              <p className="lead">Spécialités disponibles</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Number;
