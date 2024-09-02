import { useDispatch, useSelector } from "react-redux";
import {
  userDeleteFailure,
  userDeleteLoading,
  userDeleteSuccess,
} from "../features/user/userSlice";

const useDeleteProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.user);

  const deleteUser = async () => {
    dispatch(userDeleteLoading());

    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = res.json();

      if (data.success === false) {
        dispatch(userDeleteFailure(data.message));
      }

      if (res.ok) {
        dispatch(userDeleteSuccess(data));
      }
    } catch (error) {
      dispatch(userDeleteFailure(error.message));
    }
  };

  return { deleteUser };
};

export default useDeleteProfile;
