import axios from "@/src/lib/axios";
import { useState, useEffect } from "react";

const usePets = () => {
  const [pets, setPets] = useState<[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`/api/pets?page=${page}`);
        setPets(response.data.data);
        setPagination({
          current_page: response.data.meta.current_page,
          last_page: response.data.meta.last_page,
        });
      } catch (err:any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [page]);

  return { pets, setPets, loading, error, pagination, page, setPage };
};

export default usePets;
