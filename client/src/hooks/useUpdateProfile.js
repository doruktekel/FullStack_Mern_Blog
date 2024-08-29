import { useDispatch, useSelector } from "react-redux";
import {
  userUpdateFailure,
  userUpdateLoading,
  userUpdateSuccess,
} from "../features/user/userSlice";

const useUpdateProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.user);

  const update = async (formData) => {
    if (Object.keys(formData).length === 0) {
      dispatch(userUpdateFailure("No changes made"));
      return;
    }

    dispatch(userUpdateLoading());
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(userUpdateFailure(data.message));
      }
      if (res.ok) {
        dispatch(userUpdateSuccess(data));
      }
    } catch (error) {
      dispatch(userUpdateFailure(error.message));
    }
  };
  return { update };
};

export default useUpdateProfile;
