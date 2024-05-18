import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

import "./scroll.css";
import { throttle } from "throttle-debounce";

function ScrollApp() {
  const [items, setItems] = useState([]);
  const [isLast, setIsLast] = useState(false);
  const [isScrollBottom, setIsScrollBottom] = useState(false);

  const pageRef = useRef(0);
  const scrollRef = useRef(null);

  const fetch = async (init) => {
    const params = { page: pageRef.current, size: 30 };
    try {
      const response = await axios.get(
        "https://api.instantwebtools.net/v1/passengers",
        { params }
      );

      setItems(init ? response.data.data : items.concat(response.data.data));
      setIsLast(response.data.totalPages === pageRef.current);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch(true);
  }, []);

  const handleScroll = throttle(1000, () => {
    if (scrollRef.current) {
      const { scrollHeight, offsetHeight, scrollTop } = scrollRef.current;

      const offset = 50;

      setIsScrollBottom(scrollHeight - offsetHeight - scrollTop < offset);
    }
  });

  useEffect(() => {
    if (isScrollBottom) {
      pageRef.current = pageRef.current + 1;

      !isLast && fetch();
    }
  }, [isLast, isScrollBottom]);

  return (
    <div>
      <ul ref={scrollRef} className="list" onScroll={handleScroll}>
        <li className="item"></li>
        {items.map((passenger) => (
          <li className="item" key={passenger._id}>
            {passenger.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScrollApp;
