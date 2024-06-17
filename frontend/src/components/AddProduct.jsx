import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = function () {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    weight: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    postProduct();
    navigate("/products");
  };
  const postProduct = () => {
    axios.post("/api/v1/products", form);
  };
  return (
    <Container>
      <Row>
        <Col xs={6}>
          <h2>Aggiungi un nuovo prodotto</h2>
          <Form onSubmit={handleSubmit} className="mb-3">
            <Row xs={2}>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Nome prodotto*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome"
                    onChange={(e) =>
                      setForm((state) => ({
                        ...state,
                        name: e.target.value,
                      }))
                    }
                    value={form.name}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Label>Categoria*</Form.Label>
                <Form.Select
                  onChange={(e) =>
                    setForm((state) => ({
                      ...state,
                      category: e.target.value,
                    }))
                  }
                >
                  <option disabled>Seleziona una categoria</option>
                  <option value="bread">Pane</option>
                  <option value="snack">Tavola calda</option>
                  <option value="pastry">Pasticceria</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Prezzo*</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Prezzo"
                    onChange={(e) =>
                      setForm((state) => ({
                        ...state,
                        price: e.target.value,
                      }))
                    }
                    value={form.price}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Peso</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="In grammi"
                    onChange={(e) =>
                      setForm((state) => ({
                        ...state,
                        weight: e.target.value,
                      }))
                    }
                    value={form.weight}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Invia
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;
