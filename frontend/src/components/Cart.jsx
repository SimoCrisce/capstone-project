import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { TrashFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Cart = function ({ show, handleClose, cart, setCart }) {
  const removeElement = (i) => {
    const updatedCart = [...cart];
    updatedCart.splice(i, 1);
    setCart(updatedCart);
  };

  return (
    <Offcanvas placement="end" show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Carrello</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column justify-content-between">
        <div>
          {cart.map((product, i) => (
            <ListGroup className="mb-2" key={i}>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2 align-items-center">
                  <img src="https://placedog.net/700" width={100} alt="" />
                  <div>
                    <h6>
                      {product.name} {product.weight && product.weight + "g"}
                    </h6>
                    <span>
                      €{product.price * product.amount} ({product.amount} pezzi)
                    </span>
                  </div>
                </div>

                <Button
                  variant="danger"
                  onClick={() => {
                    removeElement(i);
                  }}
                >
                  <TrashFill />
                </Button>
              </ListGroup.Item>
            </ListGroup>
          ))}
          {cart.length !== 0 ? (
            <p>
              TOTALE PRODOTTI: {cart.reduce((acc, currentValue) => acc + parseFloat(currentValue.amount), 0)} <br />
              TOTALE: €
              {cart.reduce((acc, currentValue) => acc + parseFloat(currentValue.price * currentValue.amount), 0)}
            </p>
          ) : (
            <p className="text-center text-secondary fw-bold">IL CARRELLO È VUOTO</p>
          )}
        </div>
        <Link to="/purchase">
          <div className="btn btn-success">Procedi all'acquisto</div>
        </Link>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
