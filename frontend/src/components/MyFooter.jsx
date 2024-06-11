import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { EnvelopeFill, GeoAltFill, TelephoneFill } from "react-bootstrap-icons";

const MyFooter = function () {
  return (
    <footer className="bg-dark text-white py-3 mt-3">
      <Container>
        <Row xs={2} lg={4} className="border-bottom border-secondary pb-3">
          <Col className="d-flex justify-content-lg-center">
            <ul>
              <div>Servizi</div>
              <div className="text-white-50">
                <Nav.Item>Lorem</Nav.Item>
                <Nav.Item>Ipsum</Nav.Item>
              </div>
            </ul>
          </Col>
          <Col className="d-flex justify-content-lg-center">
            <ul>
              <div>Aiuto</div>
              <div className="text-white-50">
                <Nav.Item>FAQ</Nav.Item>
                <Nav.Item>Privacy Policy</Nav.Item>
              </div>
            </ul>
          </Col>
          <Col className="d-flex justify-content-lg-center">
            <ul>
              <div>Contatti</div>
              <div className="text-white-50">
                <Nav.Item>
                  <GeoAltFill /> via Roma, Milano (MI), Italy
                </Nav.Item>
                <Nav.Item>
                  <TelephoneFill /> +02 020202
                </Nav.Item>
                <Nav.Item>
                  <EnvelopeFill /> info@simon.it
                </Nav.Item>
              </div>
            </ul>
          </Col>
          <Col className="d-flex justify-content-lg-center">
            <ul>
              <div>Link</div>
              <div className="text-white-50">
                <Nav.Item>Home</Nav.Item>
                <Nav.Item>Prodotti</Nav.Item>
              </div>
            </ul>
          </Col>
        </Row>
        <p className="d-flex justify-content-center mt-3">
          Made with <span className="text-danger px-2">♥</span> by Simone Criscenti
        </p>
      </Container>
    </footer>
  );
};

export default MyFooter;
