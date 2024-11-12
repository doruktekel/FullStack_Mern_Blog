import { useState } from "react";

const usePutLike = () => {
  const [error, setError] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const putLike = async (commentId) => {
    try {
      const res = await fetch(`/api/comment/comment-like/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
      }

      if (res.ok) {
        setLikesCount(data.likes);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return { putLike, error, likesCount };
};

export default usePutLike;
