import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Grid, Box, GridItem } from "@chakra-ui/react";
import { Outlet, useNavigation } from "react-router-dom";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};
export default HomeLayout;
