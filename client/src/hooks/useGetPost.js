import { useState } from "react";

const useGetPost = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);

  const getPost = async (slug) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/post/getposts?slug=${slug}`);
      const data = await res.json();

      if (data.success === false) {
        return setError(data.message);
      }

      if (res.ok) {
        setPost(data.posts[0]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { getPost, post, error, loading };
};

export default useGetPost;
