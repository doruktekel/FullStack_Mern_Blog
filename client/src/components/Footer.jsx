import { Footer } from "flowbite-react"
import { Link } from "react-router-dom"
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs'

const FooterComp = () => {
  return (
    <Footer    container className="border border-t-4 border-teal-500 ">
        <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
        <div className="mt-5">
        <Link
        to={"/"}
        className="font-semibold whitespace-nowrap text-sm sm:text-xl dark:text-white self-center"
      >
        <span className="mr-1 px-1 py-2 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500 text-white ">
          Blog
        </span>{" "}
        Demo
      </Link>
            </div>
            <div className="grid grid-cols-2 gap-8   mt-4 sm:grid-cols-3 sm:gap-6">
                <div>                   <Footer.Title title="about" />
                    <Footer.LinkGroup col >
                            <Footer.Link href="https://tr.linkedin.com/in/doruktekel"  target="_blank" rel="noopeneer noreferrer">
                                Contack w me

                            </Footer.Link>   <Footer.Link href="/about"  target="_blank" rel="noopeneer noreferrer">
                                    Blog 

                            </Footer.Link>
                    </Footer.LinkGroup></div>

                    <div>                   <Footer.Title title="follow me" />
                    <Footer.LinkGroup col >
                            <Footer.Link href="https://github.com/doruktekel"  target="_blank" rel="noopeneer noreferrer">
                                Github

                            </Footer.Link>   <Footer.Link href="https://github.com/doruktekel/FullStack_Mern_Blog"  target="_blank" rel="noopeneer noreferrer">
                                    This Projects Repo

                            </Footer.Link>
                    </Footer.LinkGroup></div>
                    <div>                   <Footer.Title title="legal" />
                    <Footer.LinkGroup col >
                            <Footer.Link href="#"  target="_blank" rel="noopeneer noreferrer">
                                Privacy Policy

                            </Footer.Link>   <Footer.Link href="#"  target="_blank" rel="noopeneer noreferrer">
                                    Terms & Conditions

                            </Footer.Link>
                    </Footer.LinkGroup></div>
                
                </div></div>
                
                <Footer.Divider/>
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                        <Footer.Copyright href="#" by="Doruks Blog" year={new Date().getFullYear()}  />
                        <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href='#' icon={BsFacebook}/>
            <Footer.Icon href='#' icon={BsInstagram}/>
            <Footer.Icon href='#' icon={BsTwitter}/>
            <Footer.Icon href='https://github.com/doruktekel' icon={BsGithub}/>
            <Footer.Icon href='#' icon={BsDribbble}/> 
                        </div>
                </div>
                </div>
                
                </Footer>
  )
}

export default FooterComp