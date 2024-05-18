import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";

function PaginationApp() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [items, setItems] = useState([]);

  const handlePageChange = (currentPage) => {
    setPage(currentPage);
  };

  useEffect(() => {
    const fetch = async () => {
      const params = { page, size: 10 };
      const {
        data: { totalPages, data },
      } = await axios.get("https://api.instantwebtools.net/v2/passenger", {
        params,
      });
      setTotalPages(totalPages);
      setItems(data);
    };
    fetch();
  }, [page]);

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
      <Pagination
        count={totalPages}
        page={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default PaginationApp;
