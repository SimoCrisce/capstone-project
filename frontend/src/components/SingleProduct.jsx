import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SingleProduct = function () {
  const [product, setProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { id } = useParams();
  const productFetch = () => {
    axios.get("/api/v1/product/" + id).then((data) => setProduct(data.data.data));
  };
  useEffect(() => productFetch(), []);

  return (
    <Container>
      {product && (
        <Row>
          <Col xs={12} lg={6}>
            <img src="https://placedog.net/700" width="100%" alt="" />
          </Col>
          <Col xs={12} lg={6}>
            <h3>{product.name}</h3>
            <Badge bg="dark">{product.category}</Badge>
            <h5 className="text-body-tertiary">Prezzo: €{product.price}</h5>
          </Col>
          <Col xs={12}>
            <div class="d-flex justify-content-between align-items-center">
              <h3 className="my-3">Recensioni</h3>
              <Button
                onClick={() => {
                  setShowForm(!showForm);
                }}
              >
                Aggiungi una recensione
              </Button>
            </div>
            {showForm && (
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Recensione</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Form>
            )}
            {product.reviews.map((review) => {
              const created_at = new Date(review.created_at);
              return (
                <div class="border border-black p-2">
                  <div class="d-flex gap-2">
                    <h5 class="m-0">{review.user.name}</h5>
                    <span class="">{created_at.toLocaleTimeString() + " " + created_at.toLocaleDateString()}</span>
                  </div>

                  <span>{review.content}</span>
                </div>
              );
            })}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SingleProduct;
