import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { app } from "../firebase";

const DashPosts = () => {
  const { currentUser } = useSelector((store) => store.user);

  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deletePostId, setDeletePostId] = useState("");
  const [deleteImageName, setDeleteImageName] = useState("");

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

  const deleteFromFirebase = () => {
    console.log(deleteImageName);

    const storage = getStorage(app);
    const desertRef = ref(storage, `Post_Pictures/${deleteImageName}`);

    deleteObject(desertRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
      });
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/delete/${deletePostId}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (data.success === false) {
        return console.log(data.message);
      }

      if (res.ok) {
        deleteFromFirebase();
        setUserPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== deletePostId)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=" md:mx-auto p-3 table-auto overflow-x-scroll scrollbar  shadow-md sm:rounded-lg scrollbar-track-slate-200 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser && currentUser.isAdmin && userPosts.length > 0 ? (
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
                    <span
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                      onClick={() => {
                        setDeletePostId(post._id);
                        setDeleteImageName(post.imageName);
                        setShowModal(true);
                      }}
                    >
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
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size="md"
          >
            <Modal.Header></Modal.Header>
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this post ?
                </h3>
                <div className="flex gap-4 justify-center items-center">
                  <Button onClick={() => handleDeletePost()} color="gray">
                    I accept
                  </Button>
                  <Button onClick={() => setShowModal(false)} color="failure">
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <p> You have no posts yet </p>
      )}
    </div>
  );
};

export default DashPosts;
