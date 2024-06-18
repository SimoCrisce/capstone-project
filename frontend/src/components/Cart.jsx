import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { TrashFill } from "react-bootstrap-icons";
import { removeFromCartAction } from "../redux/actions";

const Cart = function ({ show, handleClose, products }) {
  const cart = useSelector((state) => state.cart.content);
  const dispatch = useDispatch();
  const cartProducts = products.push(JSON.parse(localStorage.getItem("cart")));
  console.log(cartProducts);

  return (
    <Offcanvas placement="end" show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Carrello</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column justify-content-between">
        <div>
          {products.map((product, i) => (
            <ListGroup className="mb-2" key={i}>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2 align-items-center">
                  <img src="https://placedog.net/700" width={100} alt="" />
                  <div>
                    <h6>
                      {product.name} {product.weight && product.weight + "g"}
                    </h6>
                    <span>€{product.price}</span>
                  </div>
                </div>
                <Button variant="danger" onClick={() => dispatch(removeFromCartAction(i))}>
                  <TrashFill />
                </Button>
              </ListGroup.Item>
            </ListGroup>
          ))}
          <p>
            TOTALE PRODOTTI: {cart.length} <br />
            TOTALE: €{cart.reduce((acc, currentValue) => acc + parseFloat(currentValue.price), 0)}
          </p>
        </div>
        <Button variant="success">Procedi all'acquisto</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
