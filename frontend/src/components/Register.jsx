import { useState } from "react";
import axios from "axios";
import { loginAction } from "../redux/actions";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const Register = function () {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get("/sanctum/csrf-cookie")
      .then(() => {
        const body = new FormData();
        body.append("name", form.name);
        body.append("email", form.email);
        body.append("password", form.password);
        body.append("password_confirmation", form.password_confirmation);
        return axios.post("/register", body);
      })
      .then(() => axios.get("/api/user"))
      .then((res) => {
        dispatch(loginAction(res.data));
      });
  };
  return (
    <Row className="justify-content-center">
      <Col xs={4}>
        <Form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={(e) =>
                setForm((state) => ({
                  ...state,
                  name: e.target.value,
                }))
              }
              value={form.name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={(e) =>
                setForm((state) => ({
                  ...state,
                  email: e.target.value,
                }))
              }
              value={form.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={(e) =>
                setForm((state) => ({
                  ...state,
                  password: e.target.value,
                }))
              }
              value={form.password}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password_confirmation" className="form-label">
              Conferma Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password_confirmation"
              name="password_confirmation"
              onChange={(e) =>
                setForm((state) => ({
                  ...state,
                  password_confirmation: e.target.value,
                }))
              }
              value={form.password_confirmation}
            />
          </div>
          <Button variant="outline-dark" type="submit">
            Registrati
          </Button>
          <div>
            <span>Sei già registrato?</span>
            <Link to="/login">
              <span>Login</span>
            </Link>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
