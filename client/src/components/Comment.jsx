import moment from "moment";

const Comment = ({ comment }) => {
  console.log(comment);

  const { content, createdAt, userId } = comment;

  return (
    <div className=" flex  gap-4 w-full max-w-xl mx-auto border-b-2 p-2">
      <img
        className="w-8 h-8 object-cover rounded-full"
        src={userId.profilePicture}
        alt={userId.username}
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold italic ">@{userId.username}</span>
          <span>{moment(createdAt).fromNow()}</span>
        </div>
        <div>
          <p className="text-sm">{content}</p>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Comment;
