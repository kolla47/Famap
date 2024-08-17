import { useState, useEffect } from "react";

const useFetchPeopleData = () => {
  const [peopleData, setPeopleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeopleData = async () => {
      try {
        const response = await fetch("people"); // Ensure the correct endpoint is used
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPeopleData(data);
      } catch (err) {
        setError(err.message || "Error fetching people data.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPeopleData();
  }, []);

  return { peopleData, loading, error };
};

export default useFetchPeopleData;
