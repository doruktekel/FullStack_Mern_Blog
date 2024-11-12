import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useGetPost from "../hooks/useGetPost";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";

const PostPage = () => {
  const { slug } = useParams();
  const { getPost, post, error, loading } = useGetPost();

  useEffect(() => {
    getPost(slug);
  }, [slug]);

  if (loading) {
    return (
      <div className=" flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center max-w-2xl mx-auto">
        <Spinner size="md" />
      </div>
    );
  }
  return (
    <div className="flex flex-col my-10 p-8 gap-10 items-center max-w-6xl mx-auto min-h-screen ">
      <h1 className="text-3xl sm:text-5xl font-serif capitalize">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center "
      >
        <Button pill color="gray">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.postImage}
        alt={post && post.imageName}
        className="w-full max-h-[600px] object-cover shadow-2xl"
      />
      <div className="flex justify-between border-b border-slate-500 w-full ">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-2 max-w-2xl mx-auto post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={post && post._id} />
    </div>
  );
};

export default PostPage;
