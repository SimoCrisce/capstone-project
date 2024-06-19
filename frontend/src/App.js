import "./App.css";
import Home from "./components/Home";
import MyFooter from "./components/MyFooter";
import MyNav from "./components/MyNav";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import SingleProduct from "./components/SingleProduct";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { loginAction } from "./redux/actions";
import GuestRoutes from "./components/GuestRoutes";
import Cart from "./components/Cart";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(initialCart);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    axios("/api/user")
      .then((res) => dispatch(loginAction(res.data)))
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <BrowserRouter>
        <MyNav handleShow={handleShow} />
        <Cart show={show} handleClose={handleClose} cart={cart} setCart={setCart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/:id" element={<SingleProduct cart={cart} setCart={setCart} />} />
          <Route element={<GuestRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
        <MyFooter />
      </BrowserRouter>
    )
  );
}

export default App;
