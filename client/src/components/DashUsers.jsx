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
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

const DashUsers = () => {
  const { currentUser } = useSelector((store) => store.user);

  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");

  console.log(deleteUserId);

  console.log(users);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/user/getusers");
        const data = await res.json();

        if (data.success === false) {
          return console.log(data.message);
        }

        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
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
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();

      if (data.success === false) {
        return console.log(data.message);
      }

      if (res.ok) {
        setUsers([...prevData, ...data.users]);
        if (data.users.length < 10) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/deleteusers/${deleteUserId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        return console.log(data.message);
      }

      if (res.ok) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== deleteUserId)
        );
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=" md:mx-auto p-3 table-auto overflow-x-scroll scrollbar  shadow-md sm:rounded-lg scrollbar-track-slate-200 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser && currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table>
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <TableBody key={user._id}>
                <TableRow>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <img
                      className="w-10 h-10 object-cover rounded-full text-slate-800 dark:text-slate-200"
                      src={user.profilePicture}
                      alt={user.username}
                    />
                  </TableCell>

                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                      onClick={() => {
                        setDeleteUserId(user._id);
                        setShowModal(true);
                      }}
                    >
                      Delete
                    </span>
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
                  <Button onClick={() => handleDeleteUser()} color="gray">
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

export default DashUsers;
