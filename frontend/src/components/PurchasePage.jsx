import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PurchasePage = function ({ handleClose, cart, setCart, setAlert }) {
  const [form, setForm] = useState({
    date: "",
    time: "",
    notes: "",
    phone: "",
    products: cart,
  });

  const navigate = useNavigate();

  useEffect(() => {
    handleClose();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    postForm();
  };

  const postForm = () => {
    axios
      .post("/api/v1/reservations", form, {
        validateStatus: function (status) {
          return status >= 200 && status < 300;
        },
      })
      .then((res) => {
        localStorage.setItem("cart", JSON.stringify([]));
        setCart([]);
        navigate("/reservation/summary");
        setAlert(true);
      })
      .catch((error) => console.log(error.response.data.message));
  };
  return (
    <Container>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ height: "calc(100vh - 72px - 232.8px)" }}
      >
        <Form onSubmit={handleSubmit}>
          <h2>Quando?</h2>
          <div>
            <input
              className="form-control mb-3"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) =>
                setForm((state) => ({
                  ...state,
                  date: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <input
              className="form-control mb-3"
              type="time"
              onChange={(e) =>
                setForm((state) => ({
                  ...state,
                  time: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="desc">Inserisci qualche richiesta particolare...</label> <br />
            <input
              className="form-control mb-3"
              type="text"
              id="desc"
              onChange={(e) =>
                setForm((state) => ({
                  ...state,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="phone">Recapito telefonico</label> <br />
            <input
              className="form-control mb-3"
              type="number"
              id="phone"
              onChange={(e) =>
                setForm((state) => ({
                  ...state,
                  phone: e.target.value,
                }))
              }
            />
          </div>
          <Button type="submit">Invia</Button>
        </Form>
      </div>
    </Container>
  );
};

export default PurchasePage;
