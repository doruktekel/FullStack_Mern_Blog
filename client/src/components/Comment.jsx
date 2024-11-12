import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePutLike from "../hooks/usePutLike";

const Comment = ({ comment }) => {
  const { content, createdAt, userId, _id, likes } = comment;
  const { likesCount, putLike } = usePutLike();
  const { currentUser } = useSelector((store) => store.user);
  const [currentLikes, setCurrentLikes] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleLike = async () => {
    if (currentUser) {
      await putLike(_id);
      setIsLiked(!isLiked);
      setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
    } else {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    if (currentUser && likes.includes(currentUser._id)) {
      setIsLiked(true);
    }
    setCurrentLikes(likes.length); // İlk beğeni sayısını ayarla
  }, [likes, currentUser]);

  return (
    <div className="flex gap-4 w-full max-w-xl mx-auto border-b p-2">
      <img
        className="w-8 h-8 object-cover rounded-full"
        src={userId.profilePicture}
        alt={userId.username}
      />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold italic">@{userId.username}</span>
          <span>{moment(createdAt).fromNow()}</span>
        </div>
        <div>
          <p className="text-sm min-w-fit p-2">{content}</p>
          <div className="flex gap-2 items-center py-2">
            <FaThumbsUp
              className={`text-lg cursor-pointer ${
                isLiked ? "text-blue-700" : "text-gray-500"
              } hover:text-blue-700`}
              onClick={handleLike}
            />
            <span className="text-xs">{currentLikes}</span>
            {currentLikes !== 0 && (
              <span className="text-xs">
                {currentLikes === 1 ? "Like" : "Likes"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
