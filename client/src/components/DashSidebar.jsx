import { Sidebar, SidebarItem } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaRegUser, FaArrowRight, FaFileInvoice } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useSignOut from "../hooks/useSignOut";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { signOut } = useSignOut();
  const { currentUser } = useSelector((store) => store.user);

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
            label={currentUser.isAdmin ? "admin" : "user"}
            labelColor="dark"
          >
            Profile
          </SidebarItem>
          {currentUser && currentUser.isAdmin && (
            <Sidebar.Item
              as={Link}
              to="/dashboard?tab=posts"
              active={tab === "posts"}
              icon={FaFileInvoice}
              labelColor="dark"
            >
              Posts
            </Sidebar.Item>
          )}

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
