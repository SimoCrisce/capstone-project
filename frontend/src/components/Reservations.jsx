import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Reservations = function () {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState(null);
  const filteredOrders =
    orders && orders.filter((order) => (user.role === "admin" ? order : order.user_id === user.id));

  const getOrders = () => {
    axios.get("/api/v1/reservations").then((res) => setOrders(res.data));
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container>
      {filteredOrders && filteredOrders.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              {user.role === "admin" && <th scope="col">Nome</th>}
              <th scope="col">Data</th>
              <th scope="col">Ora</th>
              <th scope="col">Note</th>
              <th scope="col">Prodotti</th>
              <th scope="col">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <th>{order.id}</th>
                {user.role === "admin" && <td>{order.user.name}</td>}
                <td>{order.date}</td>
                <td>{order.time}</td>
                <td>{order.notes}</td>
                <td>
                  <Link to={"/reservation/" + order.id} className="text-decoration-none">
                    <div>Dettagli</div>
                  </Link>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => axios.delete("/api/v1/reservations/" + order.id).then((res) => getOrders())}
                  >
                    Annulla ordine
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>
          Non c'è nessun ordine al momento! Ordina{" "}
          <Link to="/products" className="text-decoration-none">
            qui
          </Link>
          !
        </h2>
      )}
    </Container>
  );
};

export default Reservations;
