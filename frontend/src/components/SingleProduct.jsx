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
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleProduct = function ({ cart, setCart }) {
  const [amount, setAmount] = useState(1);
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [categorized, setCategorized] = useState(null);
  const [unloggedMessage, setUnloggedMessage] = useState(false);
  if (unloggedMessage)
    setTimeout(() => {
      setUnloggedMessage(false);
    }, 5000);
  const { id } = useParams();

  const user = useSelector((state) => state.user.name);

  const addElement = (productId) => {
    const newProduct = { ...product, amount };
    const updatedCart = [...cart, newProduct];
    setCart(updatedCart);
    const doesProductExist = cart.find((product) => product.id === productId);
    if (doesProductExist) {
      setCart(
        cart.map((product) => (product.id === productId ? { ...product, amount: product.amount + amount } : product))
      );
    } else {
      setCart([...cart, { ...product, amount: amount }]);
    }
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const categorizedFetch = (category) => {
    axios.get("/api/v1/products/" + category).then((data) => setCategorized(shuffle(data.data)));
  };

  const productsFetch = () => {
    axios.get("/api/v1/products").then((data) => setProducts(shuffle(data.data)));
  };

  const productFetch = () => {
    axios.get("/api/v1/product/" + id).then((data) => {
      setProduct(data.data.data);
      // setCategory(data.data.data.category);
      categorizedFetch(data.data.data.category);
    });
  };
  useEffect(() => {
    productFetch();
    productsFetch();
  }, [id]);

  console.log(product);
  return (
    <Container>
      {product && (
        <Row>
          <Col xs={12} lg={6}>
            <img src={product.img} width="100%" height="500px" alt="" />
          </Col>
          <Col xs={12} lg={6}>
            <h3 className="my-1">{product.name}</h3>
            <Badge bg="dark">{product.category}</Badge>
            <h5 className="text-body-tertiary my-1">Prezzo: €{product.price}</h5>
            <div className="d-flex align-items-center">
              <Button
                variant="outline-dark"
                className="rounded-2 rounded-end-0 amount-btn"
                onClick={() => amount > 1 && setAmount(amount - 1)}
                style={{ borderRight: "0" }}
              >
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
              <Button
                variant="outline-dark"
                className="rounded-2 rounded-start-0"
                onClick={() => setAmount(amount + 1)}
                style={{ borderLeft: "0" }}
              >
                +
              </Button>
            </div>
            <p className="my-1">Totale: €{(amount * product.price).toFixed(2)}</p>
            <Button variant="success" onClick={() => (user ? addElement(product.id) : setUnloggedMessage(true))}>
              Aggiungi all'ordine
            </Button>
            {unloggedMessage && <p className="text-danger fw-bold">FAI IL LOGIN PER POTER ORDINARE!</p>}
          </Col>
          <h2 className="my-3">Prodotti correlati</h2>
          {categorized && (
            <Row>
              {categorized
                .filter((p) => p.id.toString() !== id)
                .slice(0, 4)
                .map((product) => (
                  <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Card>
                      <Card.Img variant="top" height="200px" src={product.img ? product.img : "/not-available.jpg"} />
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                          <Link to={`/product/${product.id}`} className="text-decoration-none">
                            <div>Dettagli</div>
                          </Link>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          )}
          <h2 className="my-3">Altri prodotti</h2>
          {products && (
            <Row>
              {products
                .filter((p) => p.id.toString() !== id)
                .slice(0, 4)
                .map((product) => (
                  <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Card>
                      <Card.Img variant="top" height="200px" src={product.img ? product.img : "/not-available.jpg"} />
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                          <Link to={`/product/${product.id}`} className="text-decoration-none">
                            <div>Dettagli</div>
                          </Link>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          )}
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
