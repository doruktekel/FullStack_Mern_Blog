import { Link , useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Spinner, Alert } from "flowbite-react";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate()

  const [formData , setFormData] = useState({
    username : "" ,
    email : "" ,
    password : ""
  })

  const [errorMessage , setErrorMessage]  = useState(null)
  const [loading , setLoading] = useState(false)

  const handleChange = (e)=>{
     const {name , value} =   e.target
    setFormData((prevData)=>({
  ...prevData , 
  [name] : value.trim()
}))
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }

    try {

      setLoading(true)
      setErrorMessage(null);
      const res  = await fetch("/api/auth/signup" , {
        method : "POST",
        headers : {"Content-Type" : "application/json" },
        body : JSON.stringify(formData)
      })

      const data =   await res.json()

      if (data.success === false) {
       return setErrorMessage(data.message)
      }

      if (res.ok) {
        navigate("/sign-in")
      }

      
    } catch (error) {
      setErrorMessage(error.message)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="mt-40">
      <div className="flex flex-col flex-wrap md:flex-row gap-20 md:gap-5 max-w-4xl mx-auto px-5">
        {/* left side  */}
        <div className="flex-1">
          {" "}
          <Link
            to={"/"}
            className="font-bold  text-xl md:text-3xl dark:text-white self-center"
          >
            <span className="mr-1 p-2 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500 text-white ">
              Blog
            </span>{" "}
            Demo
          </Link>
          <p className="mt-8 font-semibold text-gray-800">
            This is the demo project , you can sign in with google
            authentication.
          </p>
        </div>
        {/* right side  */}
        <div className="flex-1 flex flex-col gap-2">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit} >
            <div className="flex flex-col gap-2">
              <Label value="Username" className="text-md" htmlFor="username" />
              <TextInput
                placeholder="Username..."
                name="username"
                id="username"
                type="text" onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label value="Email" className="text-md" htmlFor="email" />
              <TextInput placeholder="Email..." name="email" id="email" type="email" onChange={handleChange} />
            </div>
            <div className="flex flex-col gap-2">
              <Label value="Password" className="text-md" htmlFor="password" />
              <TextInput
                placeholder="Password..."
                name="password"
                id="password"
                type="password" onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              gradientDuoTone="purpleToBlue"
              outline
              className="text-sm md:text-xl mt-2"
              disabled={loading}
            >
              {
                loading ? <>
                <Spinner className="sm"/>
                <span>Loading...</span></> : "Sign Up"
              }
            </Button>
          </form>
          <p>
            Have an account ?{" "}
            <Link to={"/sign-in"} className="font-semibold text-purple-600">
              Sign in
            </Link>{" "}
          </p>
          {
            errorMessage && <Alert className="mt-2" color={failure} >{errorMessage}</Alert>
          }
        </div>
      </div>
    </div>
  );
};

export default SignUp;
