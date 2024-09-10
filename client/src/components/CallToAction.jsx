import { Button } from "flowbite-react";
import React from "react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about me ?</h2>
        <p className="text-gray-500 my-2">Checkout these resources</p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://github.com/doruktekel"
            target="_blank"
            rel="noopener noreferrer"
          >
            My github link
          </a>
        </Button>
      </div>
      <div className="p-7 ">
        <img
          className=" rounded-sm sm:rounded-xl shadow-lg"
          src="https://media.licdn.com/dms/image/D4D03AQHjdFQgBS2hig/profile-displayphoto-shrink_200_200/0/1674889385097?e=2147483647&v=beta&t=n33kaGI0KAqURQrs7iWB_YvOoGGNLfKejIuDko7dWZM"
        />
      </div>
    </div>
  );
};

export default CallToAction;
