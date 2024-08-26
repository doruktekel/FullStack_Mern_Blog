import { Button } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import useGoogle from "../hooks/useGoogle";

const OAuth = () => {
  const { google } = useGoogle();
  const handleGoogle = async () => {
    await google();
  };
  return (
    <div>
      <Button
        gradientDuoTone="pinkToOrange"
        outline
        className="w-full"
        onClick={handleGoogle}
        type="button"
      >
        <FcGoogle className="mr-4 h-5 w-5 " />
        <p>Sign in with Google</p>
      </Button>
    </div>
  );
};

export default OAuth;
