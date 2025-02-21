import axios from "@/src/lib/axios";
import { useState, useEffect } from "react";
import { useAuth } from "../auth/useAuth";

const usePets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
  const [page, setPage] = useState(1);
  const { token } = useAuth();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`/api/pets?page=${page}`, {
            headers: { "Authorization": `Bearer ${token}`},
            withCredentials: true,
        });
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

  return { pets, loading, error, pagination, page, setPage };
};

export default usePets;
