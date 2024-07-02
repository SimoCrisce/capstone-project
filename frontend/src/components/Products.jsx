import axios from "axios";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useSelector } from "react-redux";

const Products = function () {
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      axios.get("/api/v1/products").then((data) => setProducts(data.data));
    }, 500);
  }, []);

  return (
    <Container className="container-height">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          <Button
            variant="outline-dark"
            onClick={() => axios.get("/api/v1/products").then((data) => setProducts(data.data))}
          >
            Tutto
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => axios.get("/api/v1/products/bread").then((data) => setProducts(data.data))}
          >
            Pane
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => axios.get("/api/v1/products/snack").then((data) => setProducts(data.data))}
          >
            Tavola calda
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => axios.get("/api/v1/products/pastry").then((data) => setProducts(data.data))}
          >
            Pasticceria
          </Button>
        </div>
        {user && user.role === "admin" && (
          <Link to="/product/add">
            <div className="btn btn-primary">Aggiungi un nuovo prodotto</div>
          </Link>
        )}
      </div>
      <Row>
        {products ? (
          products.map((product) => {
            return (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
                <div className="card">
                  <img
                    src={product.img ? product.img : "/not-available.jpg"}
                    height="200px"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">
                        {product.name} {product.weight && product.weight + "g"}
                      </h5>
                      <h5 className="card-title">€{product.price}</h5>
                    </div>
                    <p className="card-text"></p>
                    <div
                      className={`d-flex ${
                        user && user.role === "admin" ? "justify-content-between" : "justify-content-end"
                      } align-items-center`}
                    >
                      {user && user.role === "admin" && (
                        <Link className="btn btn-success" to={`/product/edit/${product.id}`}>
                          Modifica
                        </Link>
                      )}
                      <Link className="btn btn-primary" to={`/product/${product.id}`}>
                        Dettagli
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })
        ) : (
          <div className="d-flex justify-content-center align-items-center container-height">
            <Spinner className="mx-auto" animation="border" />
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Products;
