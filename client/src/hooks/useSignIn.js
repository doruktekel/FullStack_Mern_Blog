import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInLoading,
  signInSuccess,
} from "../features/user/userSlice";

const useSignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signIn = async (formData) => {
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    dispatch(signInLoading());
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.log(error);
    }
  };

  return { signIn };
};

export default useSignIn;
