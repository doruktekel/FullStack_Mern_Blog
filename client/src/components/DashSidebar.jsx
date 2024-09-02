import { Button, Sidebar, SidebarItem } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaRegUser, FaArrowRight } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import useSignOut from "../hooks/useSignOut";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { signOut } = useSignOut();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <SidebarItem
            as={Link}
            to="/dashboard?tab=profile"
            active={tab === "profile"}
            icon={FaRegUser}
            label={"user"}
            labelColor="dark"
          >
            Profile
          </SidebarItem>

          <SidebarItem
            className="cursor-pointer"
            active
            icon={FaArrowRight}
            labelColor="dark"
            onClick={handleSignOut}
          >
            Sign Out
          </SidebarItem>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
