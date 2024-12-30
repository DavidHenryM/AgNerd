import { Heading } from "@chakra-ui/react";
import SidebarWithHeader from "../components/SideBar";
import { LoadingCard } from "../loading";

export default function Settings(){
  return (
    <SidebarWithHeader Content={LoadingCard}></SidebarWithHeader>
  )
}