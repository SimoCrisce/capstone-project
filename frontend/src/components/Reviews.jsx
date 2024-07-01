import Button from "react-bootstrap/Button";
import { TrashFill } from "react-bootstrap-icons";
import axios from "axios";
import { useSelector } from "react-redux";

const Reviews = function ({ reviews, productFetch }) {
  const user = useSelector((state) => state.user);
  return (
    <>
      {reviews.map((review) => {
        const created_at = new Date(review.created_at);
        return (
          <div key={review.id}>
            <div className="d-flex justify-content-between align-items-center border border-black p-2 mb-1">
              <div>
                <div className="d-flex gap-2">
                  <h5 className="m-0">{review.user.name}</h5>
                  <span className="">{created_at.toLocaleTimeString() + " " + created_at.toLocaleDateString()}</span>
                </div>
                <span>{review.content}</span>
              </div>
              {user && user.id === review.user_id && (
                <Button
                  variant="danger"
                  onClick={() => axios.delete("/api/v1/reviews/" + review.id).then(() => productFetch())}
                >
                  <TrashFill />
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Reviews;
