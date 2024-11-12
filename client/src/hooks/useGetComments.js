import { useState } from "react";

const useGetComments = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchedComments, setFetchedComments] = useState([]);

  const getComments = async (postId) => {
    setLoading(true);
    try {
      if (postId) {
        const res = await fetch(`/api/comment/${postId}`);
        const data = await res.json();

        if (data.success === false) {
          return setError(data.message);
        }

        if (res.ok) {
          setFetchedComments(data);
        }
      } else {
        setError("getComment error");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, getComments, fetchedComments };
};

export default useGetComments;
