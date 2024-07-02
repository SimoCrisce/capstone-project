import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ReservationSummary = function (alert) {
  const user = useSelector((state) => state.user);
  const [lastReservation, setLastReservation] = useState(null);
  const getReservations = () => {
    axios.get("/api/v1/reservations").then((res) => {
      const filteredReservations = res.data.filter((reservation) => reservation.user_id === user.id);
      setLastReservation(filteredReservations[filteredReservations.length - 1]);
    });
  };
  useEffect(() => {
    getReservations();
  }, []);
  const date = new Date(lastReservation && lastReservation.date);
  return (
    <Container className="container-height">
      {lastReservation && (
        <>
          {alert && (
            <Alert variant="success">
              Acquisto effettuato con successo! Potrai vedere i dettagli qui sotto oppure dagli{" "}
              <Link to={"/reservation/" + lastReservation.id} className="text-decoration-none">
                ordini
              </Link>
            </Alert>
          )}
          <h3>
            Ordine numero {lastReservation.id} per giorno {date.toLocaleDateString()} alle ore {lastReservation.time}
          </h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Prodotto</th>
                <th scope="col">Prezzo unitario</th>
                <th scope="col">Quantità</th>
                <th scope="col">Prezzo totale</th>
              </tr>
            </thead>
            <tbody>
              {lastReservation.products.map((product) => (
                <tr key={product.id}>
                  <th>{product.id}</th>
                  <td>
                    {product.name} {product.weight && product.weight + "g"}
                  </td>
                  <td>€{product.price}</td>
                  <td>{product.pivot.amount}</td>
                  <td>€{(product.pivot.amount * product.price).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <th>TOTALE</th>
                <td></td>
                <td></td>
                <td>
                  {lastReservation.products.reduce(
                    (acc, currentValue) => acc + parseFloat(currentValue.pivot.amount),
                    0
                  )}
                </td>
                <td>
                  €
                  {lastReservation.products
                    .reduce((acc, currentValue) => acc + parseFloat(currentValue.pivot.amount * currentValue.price), 0)
                    .toFixed(2)}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </Container>
  );
};

export default ReservationSummary;
