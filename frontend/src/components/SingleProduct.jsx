import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddReview from "./AddReview";
import Reviews from "./Reviews";

const SingleProduct = function () {
  const [amount, setAmount] = useState(1);
  const [product, setProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { id } = useParams();
  const productFetch = () => {
    axios.get("/api/v1/product/" + id).then((data) => setProduct(data.data.data));
  };
  useEffect(() => productFetch(), []);
  console.log(amount);

  return (
    <Container>
      {product && (
        <Row>
          <Col xs={12} lg={6}>
            <img src="https://placedog.net/700" width="100%" alt="" />
          </Col>
          <Col xs={12} lg={6}>
            <h3 className="my-1">{product.name}</h3>
            <Badge bg="dark">{product.category}</Badge>
            <h5 className="text-body-tertiary my-1">Prezzo: €{product.price}</h5>
            <div className="d-flex align-items-center">
              <Button variant="outline-dark" className="rounded-2" onClick={() => setAmount(amount - 1)}>
                -
              </Button>
              <input
                className="amount"
                type="number"
                value={amount}
                min={1}
                max={1000}
                onChange={(e) => setAmount(parseInt(e.target.value))}
              />
              <Button variant="outline-dark" className="rounded-2" onClick={() => setAmount(amount + 1)}>
                +
              </Button>
            </div>
            <p className="my-1">Totale: €{(amount * product.price).toFixed(2)}</p>
            <Button variant="success">Aggiungi all'ordine</Button>
          </Col>
          <Col xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="my-3">Recensioni</h3>
              <Button
                onClick={() => {
                  setShowForm(!showForm);
                }}
              >
                Aggiungi una recensione
              </Button>
            </div>
            <Row xs={1} lg={2}>
              <Col>
                <Reviews reviews={product.reviews} productFetch={productFetch} />
              </Col>
              <Col>{showForm && <AddReview id={id} productFetch={productFetch} />}</Col>
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SingleProduct;
