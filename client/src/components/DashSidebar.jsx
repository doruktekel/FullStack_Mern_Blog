import { Sidebar, SidebarItem } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaRegUser, FaArrowRight } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

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

          <SidebarItem active icon={FaArrowRight} labelColor="dark">
            Sign Out
          </SidebarItem>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
