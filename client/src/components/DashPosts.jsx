import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table, TableBody, TableCell, TableRow } from "flowbite-react";
import { Link } from "react-router-dom";

const DashPosts = () => {
  const { currentUser } = useSelector((store) => store.user);

  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();

        if (data.success === false) {
          return console.log(data.message);
        }

        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchData();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();

      if (data.success === false) {
        return console.log(data.message);
      }

      if (res.ok) {
        setUserPosts([...prevData, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=" md:mx-auto p-3 table-auto overflow-x-scroll scrollbar  shadow-md sm:rounded-lg scrollbar-track-slate-200 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <TableBody key={post._id}>
                <TableRow>
                  <TableCell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        className="w-20 h-10 object-cover"
                        src={post.postImage}
                        alt={post.title}
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/post/${post.slug}`}
                      className="font-bold text-slate-800 dark:text-slate-200"
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span className="font-medium text-red-500 hover:underline cursor-pointer">
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          {showMore && (
            <Button
              onClick={handleShowMore}
              gradientDuoTone={"purpleToPink"}
              outline
              className="self-center"
            >
              Show more
            </Button>
          )}
        </>
      ) : (
        <p> You have no posts yet </p>
      )}
    </div>
  );
};

export default DashPosts;
