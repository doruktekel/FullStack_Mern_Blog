import { Alert, Button, Spinner, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useCreateComment from "../hooks/useCreateComment";
import useGetComments from "../hooks/useGetComments";
import Comment from "./Comment";
import usePutLike from "../hooks/usePutLike";

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const { currentUser } = useSelector((store) => store.user);
  const {
    error: createError,
    loading: createLoading,
    createComment,
    newComment,
  } = useCreateComment(setComment);

  const {
    error: getCommentsError,
    loading: getCommentsLoading,
    getComments,
    fetchedComments,
  } = useGetComments();

  const { likesCount } = usePutLike();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.length > 200) {
      return;
    }
    if (postId) {
      await createComment(comment, postId);
      if (newComment) {
        setComments((prevData) => [...prevData, newComment]);
      }
    }
  };

  useEffect(() => {
    const getCommentsFunc = async () => {
      await getComments(postId);
    };
    getCommentsFunc();
  }, [postId, newComment]);

  useEffect(() => {
    if (fetchedComments) {
      setComments(fetchedComments);
    }
  }, [fetchedComments]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto p-4 ">
      {currentUser ? (
        <div className="flex gap-2 text-xs justify-center items-center">
          <p>Sign in as :</p>
          <img
            className="w-8 h-8 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt={currentUser.username}
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-cyan-500 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex gap-2 text-sm text-teal-500 justify-center items-center">
          <p>You must be login to comment - </p>
          <Link to={"/sign-in"} className="text-blue-500 underline">
            Sign in
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border  border-cyan-500 w-full max-w-2xl mx-auto flex flex-col gap-4 p-4  rounded-br-xl rounded-tl-xl"
        >
          <Textarea
            placeholder="Start writing something..."
            className="h-36 rounded-md"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={200}
          />
          <div className="flex justify-between items-center">
            <p className="text-sm">
              {200 - comment.length} characters remaining
            </p>
            <Button
              gradientDuoTone={"tealToLime"}
              outline
              disabled={createLoading}
              type="submit"
            >
              {createLoading ? <Spinner /> : "Publish"}
            </Button>
          </div>
          <div>
            <p className="px-2 py-1 border border-cyan-500 border-dotted rounded-md text-xs w-40 mx-auto text-center">
              Comments : {comments && comments.length}
            </p>
          </div>
        </form>
      )}
      {createError && <Alert color="failure">{createError}</Alert>}
      {comments.length === 0 ? (
        <div>Have not comments to show</div>
      ) : (
        <div className="flex flex-col gap-4 ">
          {comments.map((com) => (
            <Comment key={com._id} comment={com} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
