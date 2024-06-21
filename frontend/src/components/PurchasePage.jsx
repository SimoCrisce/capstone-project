import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";

const PurchasePage = function ({ handleClose, cart, setCart }) {
  const [form, setForm] = useState({
    date: "",
    time: "",
    description: "",
  });

  useEffect(() => {
    handleClose();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    postForm();
  };

  console.log(cart);
  const postForm = () => {
    axios.post("/api/v1/reservations", form);
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Quando?</h2>
        <div>
          <input
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
        <Button type="submit">Invia</Button>
      </Form>
    </Container>
  );
};

export default PurchasePage;