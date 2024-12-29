import { Heading } from "@chakra-ui/react";
import SidebarWithHeader from "../components/SideBar";
import { LoadingBar } from "../loading";

export default function Settings(){
  return (
    <SidebarWithHeader Content={LoadingBar}></SidebarWithHeader>
  )
}