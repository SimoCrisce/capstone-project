import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const Home = function () {
  const [products, setProducts] = useState();
  const getProducts = () => {
    setTimeout(() => {
      axios.get("/api/v1/products").then((res) => setProducts(res.data));
    }, 500);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      {products ? (
        <>
          <h1 className="text-center">Scopri i nostri prodotti</h1>
          <div className="d-flex justify-content-center">
            <Carousel variant="dark" style={{ height: "500px", width: "500px" }}>
              {products &&
                products.map((product) => (
                  <Carousel.Item key={product.id}>
                    <img style={{ height: "500px", width: "500px" }} src={product.img} alt="" />
                    <Carousel.Caption style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", borderRadius: "20px" }}>
                      <h3>{product.name}</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center container-height">
          <Spinner animation="border" />
        </div>
      )}
    </Container>
  );
};

export default Home;
