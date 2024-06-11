import axios from "axios";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const Products = function () {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    axios.get("/api/v1/products").then((data) => setProducts(data.data));
  }, []);
  console.log(products);
  return (
    <Container>
      <Link to="/product/add">
        <div className="btn btn-primary mb-3">Aggiungi un nuovo prodotto</div>
      </Link>
      <Row>
        {products &&
          products.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <div className="card">
                {/* <img src="https://placedog.net/500" className="card-img-top" alt="..." /> */}
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{product.id + " " + product.name}</h5>
                    <h5 className="card-title">€{product.price}</h5>
                  </div>
                  <p className="card-text"></p>
                  <Link to={`/product/${product.id}`}>Dettagli</Link>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Products;
