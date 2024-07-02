import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleReservation = function () {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState(null);
  const getOrder = () => {
    axios.get("/api/v1/reservations/" + id).then((res) => {
      setOrder(res.data);
      setProducts(res.data.products);
    });
  };
  useEffect(() => {
    getOrder();
  }, []);

  console.log(products);
  return (
    <Container className="container-height">
      <h2>Dettagli ordine</h2>
      {order && (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Data</th>
                <th scope="col">Ora</th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody>
              <tr key={order.id}>
                <th>{order.id}</th>
                <td>{order.user.name}</td>
                <td>{order.date}</td>
                <td>{order.time}</td>
                <td>{order.notes}</td>
              </tr>
            </tbody>
          </table>
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Prodotto</th>
                <th scope="col"></th>
                <th scope="col">Prezzo unitario</th>
                <th scope="col">Quantità</th>
                <th scope="col">Prezzo totale</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product.id}>
                    <th>{product.id}</th>
                    <td>
                      {product.name + " "}
                      {product.weight && product.weight + "g"}
                    </td>
                    <td></td>
                    <td>€{product.price}</td>
                    <td>{product.pivot.amount}</td>
                    <td>€{(product.pivot.amount * product.price).toFixed(2)}</td>
                  </tr>
                ))}
              <tr>
                <th>TOTALE</th>
                <td></td>
                <td></td>
                <td></td>
                <th>{products.reduce((acc, currentValue) => acc + parseFloat(currentValue.pivot.amount), 0)}</th>
                <th>
                  €
                  {products
                    .reduce((acc, currentValue) => acc + parseFloat(currentValue.pivot.amount * currentValue.price), 0)
                    .toFixed(2)}
                </th>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </Container>
  );
};

export default SingleReservation;
