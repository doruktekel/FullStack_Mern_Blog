import {
  Navbar,
  TextInput,
  Button,
  Dropdown,
  Avatar,
  DropdownHeader,
  DropdownDivider,
  DropdownItem,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaRegMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";

const Header = () => {
  const { currentUser } = useSelector((store) => store.user);
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  const path = useLocation().pathname;

  return (
    <Navbar className="border-b-2 ">
      <Link
        to={"/"}
        className="font-semibold whitespace-nowrap text-sm sm:text-xl dark:text-white self-center"
      >
        <span className="mr-1 px-1 py-2 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500 text-white ">
          Blog
        </span>{" "}
        Demo
      </Link>
      <form>
        <TextInput
          placeholder="Search..."
          rightIcon={FaSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="lg:hidden pill w-12 h-10 pill   " color="gray">
        <FaSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="hidden sm:inline w-12 h-10  pill"
          color="gray"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaRegMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar rounded alt="user" img={currentUser.profilePicture} />
            }
          >
            <DropdownHeader>
              <span className="block text-sm truncate text-center ">
                {currentUser.username}
              </span>
              <span className="block text-sm truncate text-center">
                {currentUser.email}
              </span>
            </DropdownHeader>
            <DropdownDivider />

            <Link to={"/dashboard?tab=profile"}>
              <DropdownItem>Profile</DropdownItem>
            </Link>

            <DropdownItem>Sign Out</DropdownItem>
          </Dropdown>
        ) : (
          <Link to={"/sign-in"}>
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" active={path === "/"}>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to="/about" active={path === "/about"}>
          About
        </Navbar.Link>
        <Navbar.Link as={Link} to="/projects" active={path === "/projects"}>
          Projects
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
