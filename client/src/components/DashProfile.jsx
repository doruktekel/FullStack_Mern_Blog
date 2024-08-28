import { Button, Label, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((store) => store.user);
  return (
    <div className="max-w-lg mx-auto my-10 flex flex-col w-full p-4 ">
      <h1 className="font-semibold uppercase text-center ">profile</h1>
      <form className="flex flex-col my-4 ">
        <div className="w-32 h-32 object-cover self-center">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className=" w-full h-full rounded-full"
          />
        </div>
        <div className="mb-2">
          <div className="mb-2 block">
            <Label htmlFor="username" value="Username" />
          </div>
          <TextInput
            id="username"
            type="text"
            sizing="md"
            defaultValue={currentUser.username}
          />
        </div>
        <div className="mb-2">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>

          <TextInput
            id="email"
            type="email"
            sizing="md"
            defaultValue={currentUser.email}
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            id="password"
            type="password"
            sizing="md"
            placeholder="*****"
          />
        </div>
        <Button gradientDuoTone="purpleToPink" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between ">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
