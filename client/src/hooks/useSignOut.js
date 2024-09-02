import { useDispatch } from "react-redux";
import {
  signOutFailure,
  signOutLoading,
  signOutSuccess,
} from "../features/user/userSlice";

const useSignOut = () => {
  const dispatch = useDispatch();

  const signOut = async () => {
    dispatch(signOutLoading());
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });

      const data = res.json();

      if (data.success === false) {
        return dispatch(signOutFailure(data.message));
      }

      if (res.ok) {
        return dispatch(signOutSuccess());
      }
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  return { signOut };
};

export default useSignOut;
