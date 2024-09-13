import { useState } from "react";

const useGetComments = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newGetComments, setNewGetComments] = useState([]);

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
          setNewGetComments(data);
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

  return { loading, error, getComments, newGetComments };
};

export default useGetComments;
