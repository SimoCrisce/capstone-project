import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditProduct = function () {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    weight: "",
    img: "",
  });
  const [img, setImg] = useState(null);

  const updateInputValue = (e) => {
    setForm((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const updateImageField = (e) => {
    updateInputValue(e);
    setImg(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editProduct();
    navigate("/product/" + id);
  };
  const editProduct = () => {
    const formD = new FormData();
    formD.append("name", form.name);
    formD.append("category", form.category);
    formD.append("price", form.price);
    form.weight && formD.append("weight", form.weight);
    img && formD.append("img", img);

    axios.post("/api/v1/products/" + id + "?_method=PUT", formD);
  };

  const getProduct = () => {
    axios.get("/api/v1/product/" + id).then((res) => {
      setForm({
        name: res.data.data.name,
        category: res.data.data.category,
        price: res.data.data.price,
        weight: res.data.data.weight,
      });
      setImg(res.data.data.img);
    });
  };

  useEffect(getProduct, []);
  return (
    <Container>
      <Row>
        <Col xs={6}>
          <h2>Modifica un prodotto</h2>
          <Form onSubmit={handleSubmit} className="mb-3">
            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome prodotto*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome"
                    onChange={(e) => updateInputValue(e)}
                    value={form.name}
                    name="name"
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Label>Categoria*</Form.Label>
                <Form.Select onChange={(e) => updateInputValue(e)} name="category">
                  <option selected disabled>
                    Seleziona una categoria
                  </option>
                  <option value="bread">Pane</option>
                  <option value="snack">Tavola calda</option>
                  <option value="pastry">Pasticceria</option>
                </Form.Select>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Prezzo*</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Prezzo"
                    onChange={(ev) => updateInputValue(ev)}
                    value={form.price}
                    name="price"
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Peso</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="In grammi"
                    onChange={(ev) => updateInputValue(ev)}
                    value={form.weight}
                    name="weight"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Immagine</Form.Label>
                  <Form.Control type="file" onChange={(e) => updateImageField(e)} value={form.img} name="img" />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="success" type="submit">
              Modifica
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProduct;
