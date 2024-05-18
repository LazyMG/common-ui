import axios from "axios";
import { useEffect, useRef, useState } from "react";
import useIntersectionObserver from "./hooks/useIntersectionObserver";

const Passenger = ({ isLastItem, onFetchMorePassengers, children }) => {
  const ref = useRef(null);
  const entry = useIntersectionObserver(ref, {});
  const isIntersecting = !!entry?.isIntersecting;

  useEffect(() => {
    isLastItem && isIntersecting && onFetchMorePassengers();
  }, [isLastItem, isIntersecting]);

  return (
    <div
      ref={ref}
      style={{ minHeight: "100vh", display: "flex", border: "1px dashed #000" }}
    >
      {children}
    </div>
  );
};

function IntersectingApp() {
  const [passengers, setPassengers] = useState();

  const [page, setPage] = useState();
  const [isLast, setIsLast] = useState();

  const getPassengers = async () => {
    const params = { size: 30, page };

    try {
      const res = await axios.get(
        "https://api.instantwebtools.net/v1/passengers",
        { params }
      );

      const passengers = res.data.data;
      const isLast = res.data.totalPages === page;

      setPassengers((prev) => [...prev, ...passengers]);
      setIsLast(isLast);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    !isLast && getPassengers();
  }, [page]);

  return (
    <div>
      {passengers.map((passenger, idx) => (
        <Passenger
          key={passenger._id}
          isLastItem={passengers.length - 1 === idx}
          onFetchMorePassengers={() => setPage((prev) => prev + 1)}
        >
          {passenger.name}
        </Passenger>
      ))}
    </div>
  );
}

export default IntersectingApp;
