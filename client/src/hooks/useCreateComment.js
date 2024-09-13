import { useState } from "react";
import { useSelector } from "react-redux";

const useCreateComment = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newCreatedComment, setNewCreatedComment] = useState(null);
  const { currentUser } = useSelector((store) => store.user);

  const createComment = async (comment, postId) => {
    setLoading(true);
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          userId: currentUser._id,
          postId,
        }),
      });

      const data = await res.json();

      if (data.success === false) {
        return setError(data.message);
      }

      if (res.ok) {
        setNewCreatedComment(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createComment, error, loading, newCreatedComment };
};

export default useCreateComment;
