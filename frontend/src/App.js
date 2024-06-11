import "./App.css";
import Home from "./components/Home";
import MyFooter from "./components/MyFooter";
import MyNav from "./components/MyNav";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import SingleProduct from "./components/SingleProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <MyNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;
