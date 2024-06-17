import axios from "axios";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddReview = function ({ id, productFetch }) {
  const [form, setForm] = useState({
    product_id: id,
    content: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    postReview();
  };

  const postReview = () => {
    axios.post("/api/v1/reviews", form).then(() => productFetch());
  };
  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Form.Group className="mb-3">
        <Form.Label>Recensione</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="content"
          onChange={(e) =>
            setForm((state) => ({
              ...state,
              content: e.target.value,
            }))
          }
          value={form.content}
        />
      </Form.Group>
      <Button type="submit">Invia</Button>
    </Form>
  );
};

export default AddReview;
