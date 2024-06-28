import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Reservations = function () {
  const user = useSelector((state) => state.user.name);
  const [orders, setOrders] = useState(null);

  const getOrders = () => {
    axios.get("/api/v1/reservations").then((res) => setOrders(res.data));
  };
  console.log(orders);
  useEffect(() => {
    getOrders();
  }, []);
  console.log(orders);

  return (
    <Container>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Data</th>
            <th scope="col">Ora</th>
            <th scope="col">Note</th>
            <th scope="col">Prodotti</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders
              .filter((order) => (user.role === "admin" ? order : order.user_id === user.id))
              .map((order) => (
                <tr key={order.id}>
                  <th>{order.id}</th>
                  <td>{order.user.name}</td>
                  <td>{order.date}</td>
                  <td>{order.time}</td>
                  <td>{order.notes}</td>
                  <td>
                    <Link to={"/reservation/" + order.id} className="text-decoration-none">
                      <div>Dettagli</div>
                    </Link>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Reservations;
